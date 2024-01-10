
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCClass.js';
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
var js = require('./js');

var Enum = require('./CCEnum');

var utils = require('./utils');

var _isPlainEmptyObj_DEV = utils.isPlainEmptyObj_DEV;
var _cloneable_DEV = utils.cloneable_DEV;

var Attr = require('./attribute');

var DELIMETER = Attr.DELIMETER;

var preprocess = require('./preprocess-class');

require('./requiring-frame');

var BUILTIN_ENTRIES = ['name', 'extends', 'mixins', 'ctor', '__ctor__', 'properties', 'statics', 'editor', '__ES6__'];
var INVALID_STATICS_DEV = CC_DEV && ['name', '__ctors__', '__props__', '__values__', 'arguments', 'call', 'apply', 'caller', 'length', 'prototype'];

function pushUnique(array, item) {
  if (array.indexOf(item) < 0) {
    array.push(item);
  }
}

var deferredInitializer = {
  // Configs for classes which needs deferred initialization
  datas: null,
  // register new class
  // data - {cls: cls, cb: properties, mixins: options.mixins}
  push: function push(data) {
    if (this.datas) {
      this.datas.push(data);
    } else {
      this.datas = [data]; // start a new timer to initialize

      var self = this;
      setTimeout(function () {
        self.init();
      }, 0);
    }
  },
  init: function init() {
    var datas = this.datas;

    if (datas) {
      for (var i = 0; i < datas.length; ++i) {
        var data = datas[i];
        var cls = data.cls;
        var properties = data.props;

        if (typeof properties === 'function') {
          properties = properties();
        }

        var name = js.getClassName(cls);

        if (properties) {
          declareProperties(cls, name, properties, cls.$super, data.mixins);
        } else {
          cc.errorID(3633, name);
        }
      }

      this.datas = null;
    }
  }
}; // both getter and prop must register the name into __props__ array

function appendProp(cls, name) {
  if (CC_DEV) {
    //if (!IDENTIFIER_RE.test(name)) {
    //    cc.error('The property name "' + name + '" is not compliant with JavaScript naming standards');
    //    return;
    //}
    if (name.indexOf('.') !== -1) {
      cc.errorID(3634);
      return;
    }
  }

  pushUnique(cls.__props__, name);
}

function defineProp(cls, className, propName, val, es6) {
  var defaultValue = val["default"];

  if (CC_DEV) {
    if (!es6) {
      // check default object value
      if (typeof defaultValue === 'object' && defaultValue) {
        if (Array.isArray(defaultValue)) {
          // check array empty
          if (defaultValue.length > 0) {
            cc.errorID(3635, className, propName, propName);
            return;
          }
        } else if (!_isPlainEmptyObj_DEV(defaultValue)) {
          // check cloneable
          if (!_cloneable_DEV(defaultValue)) {
            cc.errorID(3636, className, propName, propName);
            return;
          }
        }
      }
    } // check base prototype to avoid name collision


    if (CCClass.getInheritanceChain(cls).some(function (x) {
      return x.prototype.hasOwnProperty(propName);
    })) {
      cc.errorID(3637, className, propName, className);
      return;
    }
  } // set default value


  Attr.setClassAttr(cls, propName, 'default', defaultValue);
  appendProp(cls, propName); // apply attributes

  parseAttributes(cls, val, className, propName, false);

  if (CC_EDITOR && !Editor.isBuilder || CC_TEST) {
    for (var i = 0; i < onAfterProps_ET.length; i++) {
      onAfterProps_ET[i](cls, propName);
    }

    onAfterProps_ET.length = 0;
  }
}

function defineGetSet(cls, name, propName, val, es6) {
  var getter = val.get;
  var setter = val.set;
  var proto = cls.prototype;
  var d = Object.getOwnPropertyDescriptor(proto, propName);
  var setterUndefined = !d;

  if (getter) {
    if (CC_DEV && !es6 && d && d.get) {
      cc.errorID(3638, name, propName);
      return;
    }

    parseAttributes(cls, val, name, propName, true);

    if (CC_EDITOR && !Editor.isBuilder || CC_TEST) {
      onAfterProps_ET.length = 0;
    }

    Attr.setClassAttr(cls, propName, 'serializable', false);

    if (CC_DEV) {
      // 不论是否 visible 都要添加到 props，否则 asset watcher 不能正常工作
      appendProp(cls, propName);
    }

    if (!es6) {
      js.get(proto, propName, getter, setterUndefined, setterUndefined);
    }

    if (CC_EDITOR || CC_DEV) {
      Attr.setClassAttr(cls, propName, 'hasGetter', true); // 方便 editor 做判断
    }
  }

  if (setter) {
    if (!es6) {
      if (CC_DEV && d && d.set) {
        return cc.errorID(3640, name, propName);
      }

      js.set(proto, propName, setter, setterUndefined, setterUndefined);
    }

    if (CC_EDITOR || CC_DEV) {
      Attr.setClassAttr(cls, propName, 'hasSetter', true); // 方便 editor 做判断
    }
  }
}

function getDefault(defaultVal) {
  if (typeof defaultVal === 'function') {
    if (CC_EDITOR) {
      try {
        return defaultVal();
      } catch (e) {
        cc._throw(e);

        return undefined;
      }
    } else {
      return defaultVal();
    }
  }

  return defaultVal;
}

function mixinWithInherited(dest, src, filter) {
  for (var prop in src) {
    if (!dest.hasOwnProperty(prop) && (!filter || filter(prop))) {
      Object.defineProperty(dest, prop, js.getPropertyDescriptor(src, prop));
    }
  }
}

function doDefine(className, baseClass, mixins, options) {
  var shouldAddProtoCtor;
  var __ctor__ = options.__ctor__;
  var ctor = options.ctor;
  var __es6__ = options.__ES6__;

  if (CC_DEV) {
    // check ctor
    var ctorToUse = __ctor__ || ctor;

    if (ctorToUse) {
      if (CCClass._isCCClass(ctorToUse)) {
        cc.errorID(3618, className);
      } else if (typeof ctorToUse !== 'function') {
        cc.errorID(3619, className);
      } else {
        if (baseClass && /\bprototype.ctor\b/.test(ctorToUse)) {
          if (__es6__) {
            cc.errorID(3651, className || "");
          } else {
            cc.warnID(3600, className || "");
            shouldAddProtoCtor = true;
          }
        }
      }

      if (ctor) {
        if (__ctor__) {
          cc.errorID(3649, className);
        } else {
          ctor = options.ctor = _validateCtor_DEV(ctor, baseClass, className, options);
        }
      }
    }
  }

  var ctors;
  var fireClass;

  if (__es6__) {
    ctors = [ctor];
    fireClass = ctor;
  } else {
    ctors = __ctor__ ? [__ctor__] : _getAllCtors(baseClass, mixins, options);
    fireClass = _createCtor(ctors, baseClass, className, options); // extend - Create a new Class that inherits from this Class

    js.value(fireClass, 'extend', function (options) {
      options["extends"] = this;
      return CCClass(options);
    }, true);
  }

  js.value(fireClass, '__ctors__', ctors.length > 0 ? ctors : null, true);
  var prototype = fireClass.prototype;

  if (baseClass) {
    if (!__es6__) {
      js.extend(fireClass, baseClass); // 这里会把父类的 __props__ 复制给子类

      prototype = fireClass.prototype; // get extended prototype
    }

    fireClass.$super = baseClass;

    if (CC_DEV && shouldAddProtoCtor) {
      prototype.ctor = function () {};
    }
  }

  if (mixins) {
    for (var m = mixins.length - 1; m >= 0; m--) {
      var mixin = mixins[m];
      mixinWithInherited(prototype, mixin.prototype); // mixin statics (this will also copy editor attributes for component)

      mixinWithInherited(fireClass, mixin, function (prop) {
        return mixin.hasOwnProperty(prop) && (!CC_DEV || INVALID_STATICS_DEV.indexOf(prop) < 0);
      }); // mixin attributes

      if (CCClass._isCCClass(mixin)) {
        mixinWithInherited(Attr.getClassAttrs(fireClass), Attr.getClassAttrs(mixin));
      }
    } // restore constuctor overridden by mixin


    prototype.constructor = fireClass;
  }

  if (!__es6__) {
    prototype.__initProps__ = compileProps;
  }

  js.setClassName(className, fireClass);
  return fireClass;
}

function define(className, baseClass, mixins, options) {
  var Component = cc.Component;

  var frame = cc._RF.peek();

  if (frame && js.isChildClassOf(baseClass, Component)) {
    // project component
    if (js.isChildClassOf(frame.cls, Component)) {
      cc.errorID(3615);
      return null;
    }

    if (CC_DEV && frame.uuid && className) {
      cc.warnID(3616, className);
    }

    className = className || frame.script;
  }

  var cls = doDefine(className, baseClass, mixins, options);

  if (frame) {
    if (js.isChildClassOf(baseClass, Component)) {
      var uuid = frame.uuid;

      if (uuid) {
        js._setClassId(uuid, cls);

        if (CC_EDITOR) {
          Component._addMenuItem(cls, 'i18n:MAIN_MENU.component.scripts/' + className, -1);

          cls.prototype.__scriptUuid = Editor.Utils.UuidUtils.decompressUuid(uuid);
        }
      }

      frame.cls = cls;
    } else if (!js.isChildClassOf(frame.cls, Component)) {
      frame.cls = cls;
    }
  }

  return cls;
}

function normalizeClassName_DEV(className) {
  var DefaultName = 'CCClass';

  if (className) {
    className = className.replace(/^[^$A-Za-z_]/, '_').replace(/[^0-9A-Za-z_$]/g, '_');

    try {
      // validate name
      Function('function ' + className + '(){}')();
      return className;
    } catch (e) {
      ;
    }
  }

  return DefaultName;
}

function getNewValueTypeCodeJit(value) {
  var clsName = js.getClassName(value);
  var type = value.constructor;
  var res = 'new ' + clsName + '(';

  for (var i = 0; i < type.__props__.length; i++) {
    var prop = type.__props__[i];
    var propVal = value[prop];

    if (CC_DEV && typeof propVal === 'object') {
      cc.errorID(3641, clsName);
      return 'new ' + clsName + '()';
    }

    res += propVal;

    if (i < type.__props__.length - 1) {
      res += ',';
    }
  }

  return res + ')';
} // TODO - move escapeForJS, IDENTIFIER_RE, getNewValueTypeCodeJit to misc.js or a new source file
// convert a normal string including newlines, quotes and unicode characters into a string literal
// ready to use in JavaScript source


function escapeForJS(s) {
  return JSON.stringify(s). // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

function getInitPropsJit(attrs, propList) {
  // functions for generated code
  var F = [];
  var func = '';

  for (var i = 0; i < propList.length; i++) {
    var prop = propList[i];
    var attrKey = prop + DELIMETER + 'default';

    if (attrKey in attrs) {
      // getter does not have default
      var statement;

      if (IDENTIFIER_RE.test(prop)) {
        statement = 'this.' + prop + '=';
      } else {
        statement = 'this[' + escapeForJS(prop) + ']=';
      }

      var expression;
      var def = attrs[attrKey];

      if (typeof def === 'object' && def) {
        if (def instanceof cc.ValueType) {
          expression = getNewValueTypeCodeJit(def);
        } else if (Array.isArray(def)) {
          expression = '[]';
        } else {
          expression = '{}';
        }
      } else if (typeof def === 'function') {
        var index = F.length;
        F.push(def);
        expression = 'F[' + index + ']()';

        if (CC_EDITOR) {
          func += 'try {\n' + statement + expression + ';\n}\ncatch(e) {\ncc._throw(e);\n' + statement + 'undefined;\n}\n';
          continue;
        }
      } else if (typeof def === 'string') {
        expression = escapeForJS(def);
      } else {
        // number, boolean, null, undefined
        expression = def;
      }

      statement = statement + expression + ';\n';
      func += statement;
    }
  } // if (CC_TEST && !isPhantomJS) {
  //     console.log(func);
  // }


  var initProps;

  if (F.length === 0) {
    initProps = Function(func);
  } else {
    initProps = Function('F', 'return (function(){\n' + func + '})')(F);
  }

  return initProps;
}

function getInitProps(attrs, propList) {
  var props = null;
  var simpleEnd = 0;
  var valueTypeEnd = 0;

  (function () {
    // triage properties
    var simples = null;
    var valueTypes = null;
    var advanceds = null;

    for (var i = 0; i < propList.length; ++i) {
      var prop = propList[i];
      var attrKey = prop + DELIMETER + 'default';

      if (attrKey in attrs) {
        // getter does not have default
        var def = attrs[attrKey];

        if (typeof def === 'object' && def || typeof def === 'function') {
          if (def instanceof cc.ValueType) {
            if (!valueTypes) {
              valueTypes = [];
            }

            valueTypes.push(prop, def);
          } else {
            if (!advanceds) {
              advanceds = [];
            }

            advanceds.push(prop, def);
          }
        } else {
          // number, boolean, null, undefined, string
          if (!simples) {
            simples = [];
          }

          simples.push(prop, def);
        }
      }
    } // concat in compact memory


    simpleEnd = simples ? simples.length : 0;
    valueTypeEnd = simpleEnd + (valueTypes ? valueTypes.length : 0);
    var totalLength = valueTypeEnd + (advanceds ? advanceds.length : 0);
    props = new Array(totalLength);

    for (var _i = 0; _i < simpleEnd; ++_i) {
      props[_i] = simples[_i];
    }

    for (var _i2 = simpleEnd; _i2 < valueTypeEnd; ++_i2) {
      props[_i2] = valueTypes[_i2 - simpleEnd];
    }

    for (var _i3 = valueTypeEnd; _i3 < totalLength; ++_i3) {
      props[_i3] = advanceds[_i3 - valueTypeEnd];
    }
  })();

  return function () {
    var i = 0;

    for (; i < simpleEnd; i += 2) {
      this[props[i]] = props[i + 1];
    }

    for (; i < valueTypeEnd; i += 2) {
      this[props[i]] = props[i + 1].clone();
    }

    for (; i < props.length; i += 2) {
      var def = props[i + 1];

      if (Array.isArray(def)) {
        this[props[i]] = [];
      } else {
        var value;

        if (typeof def === 'object') {
          value = {};
        } else {
          // def is function
          if (CC_EDITOR) {
            try {
              value = def();
            } catch (err) {
              cc._throw(e);

              continue;
            }
          } else {
            value = def();
          }
        }

        this[props[i]] = value;
      }
    }
  };
} // simple test variable name


var IDENTIFIER_RE = /^[A-Za-z_$][0-9A-Za-z_$]*$/;

function compileProps(actualClass) {
  // init deferred properties
  var attrs = Attr.getClassAttrs(actualClass);
  var propList = actualClass.__props__;

  if (propList === null) {
    deferredInitializer.init();
    propList = actualClass.__props__;
  } // Overwite __initProps__ to avoid compile again.


  var initProps = CC_SUPPORT_JIT ? getInitPropsJit(attrs, propList) : getInitProps(attrs, propList);
  actualClass.prototype.__initProps__ = initProps; // call instantiateProps immediately, no need to pass actualClass into it anymore
  // (use call to manually bind `this` because `this` may not instanceof actualClass)

  initProps.call(this);
}

var _createCtor = CC_SUPPORT_JIT ? function (ctors, baseClass, className, options) {
  var superCallBounded = baseClass && boundSuperCalls(baseClass, options, className);
  var ctorName = CC_DEV ? normalizeClassName_DEV(className) : 'CCClass';
  var body = 'return function ' + ctorName + '(){\n';

  if (superCallBounded) {
    body += 'this._super=null;\n';
  } // instantiate props


  body += 'this.__initProps__(' + ctorName + ');\n'; // call user constructors

  var ctorLen = ctors.length;

  if (ctorLen > 0) {
    var useTryCatch = CC_DEV && !(className && className.startsWith('cc.'));

    if (useTryCatch) {
      body += 'try{\n';
    }

    var SNIPPET = '].apply(this,arguments);\n';

    if (ctorLen === 1) {
      body += ctorName + '.__ctors__[0' + SNIPPET;
    } else {
      body += 'var cs=' + ctorName + '.__ctors__;\n';

      for (var i = 0; i < ctorLen; i++) {
        body += 'cs[' + i + SNIPPET;
      }
    }

    if (useTryCatch) {
      body += '}catch(e){\n' + 'cc._throw(e);\n' + '}\n';
    }
  }

  body += '}';
  return Function(body)();
} : function (ctors, baseClass, className, options) {
  var superCallBounded = baseClass && boundSuperCalls(baseClass, options, className);
  var ctorLen = ctors.length;

  var _Class5;

  if (ctorLen > 0) {
    if (superCallBounded) {
      if (ctorLen === 2) {
        // User Component
        _Class5 = function Class() {
          this._super = null;

          this.__initProps__(_Class5);

          ctors[0].apply(this, arguments);
          ctors[1].apply(this, arguments);
        };
      } else {
        _Class5 = function _Class() {
          this._super = null;

          this.__initProps__(_Class5);

          for (var i = 0; i < ctors.length; ++i) {
            ctors[i].apply(this, arguments);
          }
        };
      }
    } else {
      if (ctorLen === 3) {
        // Node
        _Class5 = function _Class2() {
          this.__initProps__(_Class5);

          ctors[0].apply(this, arguments);
          ctors[1].apply(this, arguments);
          ctors[2].apply(this, arguments);
        };
      } else {
        _Class5 = function _Class3() {
          this.__initProps__(_Class5);

          var ctors = _Class5.__ctors__;

          for (var i = 0; i < ctors.length; ++i) {
            ctors[i].apply(this, arguments);
          }
        };
      }
    }
  } else {
    _Class5 = function _Class4() {
      if (superCallBounded) {
        this._super = null;
      }

      this.__initProps__(_Class5);
    };
  }

  return _Class5;
};

function _validateCtor_DEV(ctor, baseClass, className, options) {
  if (CC_EDITOR && baseClass) {
    // check super call in constructor
    var originCtor = ctor;

    if (SuperCallReg.test(ctor)) {
      if (options.__ES6__) {
        cc.errorID(3651, className);
      } else {
        cc.warnID(3600, className); // suppresss super call

        ctor = function ctor() {
          this._super = function () {};

          var ret = originCtor.apply(this, arguments);
          this._super = null;
          return ret;
        };
      }
    }
  } // check ctor


  if (ctor.length > 0 && (!className || !className.startsWith('cc.'))) {
    // To make a unified CCClass serialization process,
    // we don't allow parameters for constructor when creating instances of CCClass.
    // For advanced user, construct arguments can still get from 'arguments'.
    cc.warnID(3617, className);
  }

  return ctor;
}

function _getAllCtors(baseClass, mixins, options) {
  // get base user constructors
  function getCtors(cls) {
    if (CCClass._isCCClass(cls)) {
      return cls.__ctors__ || [];
    } else {
      return [cls];
    }
  }

  var ctors = []; // if (options.__ES6__) {
  //     if (mixins) {
  //         let baseOrMixins = getCtors(baseClass);
  //         for (let b = 0; b < mixins.length; b++) {
  //             let mixin = mixins[b];
  //             if (mixin) {
  //                 let baseCtors = getCtors(mixin);
  //                 for (let c = 0; c < baseCtors.length; c++) {
  //                     if (baseOrMixins.indexOf(baseCtors[c]) < 0) {
  //                         pushUnique(ctors, baseCtors[c]);
  //                     }
  //                 }
  //             }
  //         }
  //     }
  // }
  // else {

  var baseOrMixins = [baseClass].concat(mixins);

  for (var b = 0; b < baseOrMixins.length; b++) {
    var baseOrMixin = baseOrMixins[b];

    if (baseOrMixin) {
      var baseCtors = getCtors(baseOrMixin);

      for (var c = 0; c < baseCtors.length; c++) {
        pushUnique(ctors, baseCtors[c]);
      }
    }
  } // }
  // append subclass user constructors


  var ctor = options.ctor;

  if (ctor) {
    ctors.push(ctor);
  }

  return ctors;
}

var SuperCallReg = /xyz/.test(function () {
  xyz;
}) ? /\b\._super\b/ : /.*/;
var SuperCallRegStrict = /xyz/.test(function () {
  xyz;
}) ? /this\._super\s*\(/ : /(NONE){99}/;

function boundSuperCalls(baseClass, options, className) {
  var hasSuperCall = false;

  for (var funcName in options) {
    if (BUILTIN_ENTRIES.indexOf(funcName) >= 0) {
      continue;
    }

    var func = options[funcName];

    if (typeof func !== 'function') {
      continue;
    }

    var pd = js.getPropertyDescriptor(baseClass.prototype, funcName);

    if (pd) {
      var superFunc = pd.value; // ignore pd.get, assume that function defined by getter is just for warnings

      if (typeof superFunc === 'function') {
        if (SuperCallReg.test(func)) {
          hasSuperCall = true; // boundSuperCall

          options[funcName] = function (superFunc, func) {
            return function () {
              var tmp = this._super; // Add a new ._super() method that is the same method but on the super-Class

              this._super = superFunc;
              var ret = func.apply(this, arguments); // The method only need to be bound temporarily, so we remove it when we're done executing

              this._super = tmp;
              return ret;
            };
          }(superFunc, func);
        }

        continue;
      }
    }

    if (CC_DEV && SuperCallRegStrict.test(func)) {
      cc.warnID(3620, className, funcName);
    }
  }

  return hasSuperCall;
}

function declareProperties(cls, className, properties, baseClass, mixins, es6) {
  cls.__props__ = [];

  if (baseClass && baseClass.__props__) {
    cls.__props__ = baseClass.__props__.slice();
  }

  if (mixins) {
    for (var m = 0; m < mixins.length; ++m) {
      var mixin = mixins[m];

      if (mixin.__props__) {
        cls.__props__ = cls.__props__.concat(mixin.__props__.filter(function (x) {
          return cls.__props__.indexOf(x) < 0;
        }));
      }
    }
  }

  if (properties) {
    // 预处理属性
    preprocess.preprocessAttrs(properties, className, cls, es6);

    for (var propName in properties) {
      var val = properties[propName];

      if ('default' in val) {
        defineProp(cls, className, propName, val, es6);
      } else {
        defineGetSet(cls, className, propName, val, es6);
      }
    }
  }

  var attrs = Attr.getClassAttrs(cls);
  cls.__values__ = cls.__props__.filter(function (prop) {
    return attrs[prop + DELIMETER + 'serializable'] !== false;
  });
}
/**
 * @module cc
 */

/**
 * !#en Defines a CCClass using the given specification, please see [Class](/docs/editors_and_tools/creator-chapters/scripting/class.html) for details.
 * !#zh 定义一个 CCClass，传入参数必须是一个包含类型参数的字面量对象，具体用法请查阅[类型定义](/docs/creator/scripting/class.html)。
 *
 * @method Class
 *
 * @param {Object} [options]
 * @param {String} [options.name] - The class name used for serialization.
 * @param {Function} [options.extends] - The base class.
 * @param {Function} [options.ctor] - The constructor.
 * @param {Function} [options.__ctor__] - The same as ctor, but less encapsulated.
 * @param {Object} [options.properties] - The property definitions.
 * @param {Object} [options.statics] - The static members.
 * @param {Function[]} [options.mixins]
 *
 * @param {Object} [options.editor] - attributes for Component listed below.
 * @param {Boolean} [options.editor.executeInEditMode=false] - Allows the current component to run in edit mode. By default, all components are executed only at runtime, meaning that they will not have their callback functions executed while the Editor is in edit mode.
 * @param {Function} [options.editor.requireComponent] - Automatically add required component as a dependency.
 * @param {String} [options.editor.menu] - The menu path to register a component to the editors "Component" menu. Eg. "Rendering/Camera".
 * @param {Number} [options.editor.executionOrder=0] - The execution order of lifecycle methods for Component. Those less than 0 will execute before while those greater than 0 will execute after. The order will only affect onLoad, onEnable, start, update and lateUpdate while onDisable and onDestroy will not be affected.
 * @param {Boolean} [options.editor.disallowMultiple] - If specified to a type, prevents Component of the same type (or subtype) to be added more than once to a Node.
 * @param {Boolean} [options.editor.playOnFocus=false] - This property is only available when executeInEditMode is set. If specified, the editor's scene view will keep updating this node in 60 fps when it is selected, otherwise, it will update only if necessary.
 * @param {String} [options.editor.inspector] - Customize the page url used by the current component to render in the Properties.
 * @param {String} [options.editor.icon] - Customize the icon that the current component displays in the editor.
 * @param {String} [options.editor.help] - The custom documentation URL
 *
 * @param {Function} [options.update] - lifecycle method for Component, see {{#crossLink "Component/update:method"}}{{/crossLink}}
 * @param {Function} [options.lateUpdate] - lifecycle method for Component, see {{#crossLink "Component/lateUpdate:method"}}{{/crossLink}}
 * @param {Function} [options.onLoad] - lifecycle method for Component, see {{#crossLink "Component/onLoad:method"}}{{/crossLink}}
 * @param {Function} [options.start] - lifecycle method for Component, see {{#crossLink "Component/start:method"}}{{/crossLink}}
 * @param {Function} [options.onEnable] - lifecycle method for Component, see {{#crossLink "Component/onEnable:method"}}{{/crossLink}}
 * @param {Function} [options.onDisable] - lifecycle method for Component, see {{#crossLink "Component/onDisable:method"}}{{/crossLink}}
 * @param {Function} [options.onDestroy] - lifecycle method for Component, see {{#crossLink "Component/onDestroy:method"}}{{/crossLink}}
 * @param {Function} [options.onFocusInEditor] - lifecycle method for Component, see {{#crossLink "Component/onFocusInEditor:method"}}{{/crossLink}}
 * @param {Function} [options.onLostFocusInEditor] - lifecycle method for Component, see {{#crossLink "Component/onLostFocusInEditor:method"}}{{/crossLink}}
 * @param {Function} [options.resetInEditor] - lifecycle method for Component, see {{#crossLink "Component/resetInEditor:method"}}{{/crossLink}}
 * @param {Function} [options.onRestore] - for Component only, see {{#crossLink "Component/onRestore:method"}}{{/crossLink}}
 * @param {Function} [options._getLocalBounds] - for Component only, see {{#crossLink "Component/_getLocalBounds:method"}}{{/crossLink}}
 *
 * @return {Function} - the created class
 *
 * @example

 // define base class
 var Node = cc.Class();

 // define sub class
 var Sprite = cc.Class({
     name: 'Sprite',
     extends: Node,

     ctor: function () {
         this.url = "";
         this.id = 0;
     },

     statics: {
         // define static members
         count: 0,
         getBounds: function (spriteList) {
             // compute bounds...
         }
     },

     properties {
         width: {
             default: 128,
             type: cc.Integer,
             tooltip: 'The width of sprite'
         },
         height: 128,
         size: {
             get: function () {
                 return cc.v2(this.width, this.height);
             }
         }
     },

     load: function () {
         // load this.url...
     };
 });

 // instantiate

 var obj = new Sprite();
 obj.url = 'sprite.png';
 obj.load();
 */


function CCClass(options) {
  options = options || {};
  var name = options.name;
  var base = options["extends"]
  /* || CCObject*/
  ;
  var mixins = options.mixins; // create constructor

  var cls = define(name, base, mixins, options);

  if (!name) {
    name = cc.js.getClassName(cls);
  }

  cls._sealed = true;

  if (base) {
    base._sealed = false;
  } // define Properties


  var properties = options.properties;

  if (typeof properties === 'function' || base && base.__props__ === null || mixins && mixins.some(function (x) {
    return x.__props__ === null;
  })) {
    if (CC_DEV && options.__ES6__) {
      cc.error('not yet implement deferred properties for ES6 Classes');
    } else {
      deferredInitializer.push({
        cls: cls,
        props: properties,
        mixins: mixins
      });
      cls.__props__ = cls.__values__ = null;
    }
  } else {
    declareProperties(cls, name, properties, base, options.mixins, options.__ES6__);
  } // define statics


  var statics = options.statics;

  if (statics) {
    var staticPropName;

    if (CC_DEV) {
      for (staticPropName in statics) {
        if (INVALID_STATICS_DEV.indexOf(staticPropName) !== -1) {
          cc.errorID(3642, name, staticPropName, staticPropName);
        }
      }
    }

    for (staticPropName in statics) {
      cls[staticPropName] = statics[staticPropName];
    }
  } // define functions


  for (var funcName in options) {
    if (BUILTIN_ENTRIES.indexOf(funcName) >= 0) {
      continue;
    }

    var func = options[funcName];

    if (!preprocess.validateMethodWithProps(func, funcName, name, cls, base)) {
      continue;
    } // use value to redefine some super method defined as getter


    js.value(cls.prototype, funcName, func, true, true);
  }

  var editor = options.editor;

  if (editor) {
    cc.Component._registerEditorProps(cls, editor);
  }

  return cls;
}
/**
 * Checks whether the constructor is created by cc.Class
 *
 * @method _isCCClass
 * @param {Function} constructor
 * @return {Boolean}
 * @private
 */


CCClass._isCCClass = function (constructor) {
  return constructor && constructor.hasOwnProperty('__ctors__'); // is not inherited __ctors__
}; //
// Optimized define function only for internal classes
//
// @method _fastDefine
// @param {String} className
// @param {Function} constructor
// @param {Object} serializableFields
// @private
//


CCClass._fastDefine = function (className, constructor, serializableFields) {
  js.setClassName(className, constructor); //constructor.__ctors__ = constructor.__ctors__ || null;

  var props = constructor.__props__ = constructor.__values__ = Object.keys(serializableFields);
  var attrs = Attr.getClassAttrs(constructor);

  for (var i = 0; i < props.length; i++) {
    var key = props[i];
    attrs[key + DELIMETER + 'visible'] = false;
    attrs[key + DELIMETER + 'default'] = serializableFields[key];
  }
};

CCClass.Attr = Attr;
CCClass.attr = Attr.attr;
/*
 * Return all super classes
 * @method getInheritanceChain
 * @param {Function} constructor
 * @return {Function[]}
 */

CCClass.getInheritanceChain = function (klass) {
  var chain = [];

  for (;;) {
    klass = js.getSuper(klass);

    if (!klass) {
      break;
    }

    if (klass !== Object) {
      chain.push(klass);
    }
  }

  return chain;
};

var PrimitiveTypes = {
  // Specify that the input value must be integer in Properties.
  // Also used to indicates that the type of elements in array or the type of value in dictionary is integer.
  Integer: 'Number',
  // Indicates that the type of elements in array or the type of value in dictionary is double.
  Float: 'Number',
  Boolean: 'Boolean',
  String: 'String'
};
var onAfterProps_ET = [];

function parseAttributes(cls, attributes, className, propName, usedInGetter) {
  var ERR_Type = CC_DEV ? 'The %s of %s must be type %s' : '';
  var attrs = null;
  var propNamePrefix = '';

  function initAttrs() {
    propNamePrefix = propName + DELIMETER;
    return attrs = Attr.getClassAttrs(cls);
  }

  if (CC_EDITOR && !Editor.isBuilder || CC_TEST) {
    onAfterProps_ET.length = 0;
  }

  var type = attributes.type;

  if (type) {
    var primitiveType = PrimitiveTypes[type];

    if (primitiveType) {
      (attrs || initAttrs())[propNamePrefix + 'type'] = type;

      if ((CC_EDITOR && !Editor.isBuilder || CC_TEST) && !attributes._short) {
        onAfterProps_ET.push(Attr.getTypeChecker_ET(primitiveType, 'cc.' + type));
      }
    } else if (type === 'Object') {
      if (CC_DEV) {
        cc.errorID(3644, className, propName);
      }
    } else {
      if (type === Attr.ScriptUuid) {
        (attrs || initAttrs())[propNamePrefix + 'type'] = 'Script';
        attrs[propNamePrefix + 'ctor'] = cc.ScriptAsset;
      } else {
        if (typeof type === 'object') {
          if (Enum.isEnum(type)) {
            (attrs || initAttrs())[propNamePrefix + 'type'] = 'Enum';
            attrs[propNamePrefix + 'enumList'] = Enum.getList(type);
          } else if (CC_DEV) {
            cc.errorID(3645, className, propName, type);
          }
        } else if (typeof type === 'function') {
          (attrs || initAttrs())[propNamePrefix + 'type'] = 'Object';
          attrs[propNamePrefix + 'ctor'] = type;

          if ((CC_EDITOR && !Editor.isBuilder || CC_TEST) && !attributes._short) {
            onAfterProps_ET.push(Attr.getObjTypeChecker_ET(type));
          }
        } else if (CC_DEV) {
          cc.errorID(3646, className, propName, type);
        }
      }
    }
  }

  function parseSimpleAttr(attrName, expectType) {
    if (attrName in attributes) {
      var val = attributes[attrName];

      if (typeof val === expectType) {
        (attrs || initAttrs())[propNamePrefix + attrName] = val;
      } else if (CC_DEV) {
        cc.error(ERR_Type, attrName, className, propName, expectType);
      }
    }
  }

  if (attributes.editorOnly) {
    if (CC_DEV && usedInGetter) {
      cc.errorID(3613, "editorOnly", name, propName);
    } else {
      (attrs || initAttrs())[propNamePrefix + 'editorOnly'] = true;
    }
  } //parseSimpleAttr('preventDeferredLoad', 'boolean');


  if (CC_DEV) {
    parseSimpleAttr('displayName', 'string');
    parseSimpleAttr('multiline', 'boolean');

    if (attributes.readonly) {
      (attrs || initAttrs())[propNamePrefix + 'readonly'] = true;
    }

    parseSimpleAttr('tooltip', 'string');
    parseSimpleAttr('slide', 'boolean');
  }

  if (attributes.serializable === false) {
    if (CC_DEV && usedInGetter) {
      cc.errorID(3613, "serializable", name, propName);
    } else {
      (attrs || initAttrs())[propNamePrefix + 'serializable'] = false;
    }
  } // if (CC_BUILD || CC_TEST) {
  //     let fsa = attributes.formerlySerializedAs;
  //     if (fsa) {
  //         // js.set(cls.prototype, fsa, function (val) {
  //         //     this[propName] = val;
  //         // });
  //         (attrs || initAttrs())[propNamePrefix + 'formerlySerializedAs'] = fsa;
  //         // used by deserialize-compiled
  //         attrs[fsa + DELIMETER + 'deserializeAs'] = propName;
  //         cls.__FSA__ = true;     // inheritable
  //     }
  // }
  // else {
  //     parseSimpleAttr('formerlySerializedAs', 'string');
  // }


  parseSimpleAttr('formerlySerializedAs', 'string');

  if (CC_EDITOR) {
    parseSimpleAttr('notifyFor', 'string');

    if ('animatable' in attributes) {
      (attrs || initAttrs())[propNamePrefix + 'animatable'] = !!attributes.animatable;
    }
  }

  if (CC_DEV) {
    var visible = attributes.visible;

    if (typeof visible !== 'undefined') {
      if (!visible) {
        (attrs || initAttrs())[propNamePrefix + 'visible'] = false;
      } else if (typeof visible === 'function') {
        (attrs || initAttrs())[propNamePrefix + 'visible'] = visible;
      }
    } else {
      var startsWithUS = propName.charCodeAt(0) === 95;

      if (startsWithUS) {
        (attrs || initAttrs())[propNamePrefix + 'visible'] = false;
      }
    }
  }

  var range = attributes.range;

  if (range) {
    if (Array.isArray(range)) {
      if (range.length >= 2) {
        (attrs || initAttrs())[propNamePrefix + 'min'] = range[0];
        attrs[propNamePrefix + 'max'] = range[1];

        if (range.length > 2) {
          attrs[propNamePrefix + 'step'] = range[2];
        }
      } else if (CC_DEV) {
        cc.errorID(3647);
      }
    } else if (CC_DEV) {
      cc.error(ERR_Type, 'range', className, propName, 'array');
    }
  }

  parseSimpleAttr('min', 'number');
  parseSimpleAttr('max', 'number');
  parseSimpleAttr('step', 'number');
  parseSimpleAttr('userData', 'object');
}

cc.Class = CCClass;
module.exports = {
  isArray: function isArray(defaultVal) {
    defaultVal = getDefault(defaultVal);
    return Array.isArray(defaultVal);
  },
  fastDefine: CCClass._fastDefine,
  getNewValueTypeCode: CC_SUPPORT_JIT && getNewValueTypeCodeJit,
  IDENTIFIER_RE: IDENTIFIER_RE,
  escapeForJS: escapeForJS,
  getDefault: getDefault
};

if (CC_TEST) {
  js.mixin(CCClass, module.exports);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxDQ0NsYXNzLmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsIkVudW0iLCJ1dGlscyIsIl9pc1BsYWluRW1wdHlPYmpfREVWIiwiaXNQbGFpbkVtcHR5T2JqX0RFViIsIl9jbG9uZWFibGVfREVWIiwiY2xvbmVhYmxlX0RFViIsIkF0dHIiLCJERUxJTUVURVIiLCJwcmVwcm9jZXNzIiwiQlVJTFRJTl9FTlRSSUVTIiwiSU5WQUxJRF9TVEFUSUNTX0RFViIsIkNDX0RFViIsInB1c2hVbmlxdWUiLCJhcnJheSIsIml0ZW0iLCJpbmRleE9mIiwicHVzaCIsImRlZmVycmVkSW5pdGlhbGl6ZXIiLCJkYXRhcyIsImRhdGEiLCJzZWxmIiwic2V0VGltZW91dCIsImluaXQiLCJpIiwibGVuZ3RoIiwiY2xzIiwicHJvcGVydGllcyIsInByb3BzIiwibmFtZSIsImdldENsYXNzTmFtZSIsImRlY2xhcmVQcm9wZXJ0aWVzIiwiJHN1cGVyIiwibWl4aW5zIiwiY2MiLCJlcnJvcklEIiwiYXBwZW5kUHJvcCIsIl9fcHJvcHNfXyIsImRlZmluZVByb3AiLCJjbGFzc05hbWUiLCJwcm9wTmFtZSIsInZhbCIsImVzNiIsImRlZmF1bHRWYWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsIkNDQ2xhc3MiLCJnZXRJbmhlcml0YW5jZUNoYWluIiwic29tZSIsIngiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInNldENsYXNzQXR0ciIsInBhcnNlQXR0cmlidXRlcyIsIkNDX0VESVRPUiIsIkVkaXRvciIsImlzQnVpbGRlciIsIkNDX1RFU1QiLCJvbkFmdGVyUHJvcHNfRVQiLCJkZWZpbmVHZXRTZXQiLCJnZXR0ZXIiLCJnZXQiLCJzZXR0ZXIiLCJzZXQiLCJwcm90byIsImQiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJzZXR0ZXJVbmRlZmluZWQiLCJnZXREZWZhdWx0IiwiZGVmYXVsdFZhbCIsImUiLCJfdGhyb3ciLCJ1bmRlZmluZWQiLCJtaXhpbldpdGhJbmhlcml0ZWQiLCJkZXN0Iiwic3JjIiwiZmlsdGVyIiwicHJvcCIsImRlZmluZVByb3BlcnR5IiwiZ2V0UHJvcGVydHlEZXNjcmlwdG9yIiwiZG9EZWZpbmUiLCJiYXNlQ2xhc3MiLCJvcHRpb25zIiwic2hvdWxkQWRkUHJvdG9DdG9yIiwiX19jdG9yX18iLCJjdG9yIiwiX19lczZfXyIsIl9fRVM2X18iLCJjdG9yVG9Vc2UiLCJfaXNDQ0NsYXNzIiwidGVzdCIsIndhcm5JRCIsIl92YWxpZGF0ZUN0b3JfREVWIiwiY3RvcnMiLCJmaXJlQ2xhc3MiLCJfZ2V0QWxsQ3RvcnMiLCJfY3JlYXRlQ3RvciIsInZhbHVlIiwiZXh0ZW5kIiwibSIsIm1peGluIiwiZ2V0Q2xhc3NBdHRycyIsImNvbnN0cnVjdG9yIiwiX19pbml0UHJvcHNfXyIsImNvbXBpbGVQcm9wcyIsInNldENsYXNzTmFtZSIsImRlZmluZSIsIkNvbXBvbmVudCIsImZyYW1lIiwiX1JGIiwicGVlayIsImlzQ2hpbGRDbGFzc09mIiwidXVpZCIsInNjcmlwdCIsIl9zZXRDbGFzc0lkIiwiX2FkZE1lbnVJdGVtIiwiX19zY3JpcHRVdWlkIiwiVXRpbHMiLCJVdWlkVXRpbHMiLCJkZWNvbXByZXNzVXVpZCIsIm5vcm1hbGl6ZUNsYXNzTmFtZV9ERVYiLCJEZWZhdWx0TmFtZSIsInJlcGxhY2UiLCJGdW5jdGlvbiIsImdldE5ld1ZhbHVlVHlwZUNvZGVKaXQiLCJjbHNOYW1lIiwidHlwZSIsInJlcyIsInByb3BWYWwiLCJlc2NhcGVGb3JKUyIsInMiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0SW5pdFByb3BzSml0IiwiYXR0cnMiLCJwcm9wTGlzdCIsIkYiLCJmdW5jIiwiYXR0cktleSIsInN0YXRlbWVudCIsIklERU5USUZJRVJfUkUiLCJleHByZXNzaW9uIiwiZGVmIiwiVmFsdWVUeXBlIiwiaW5kZXgiLCJpbml0UHJvcHMiLCJnZXRJbml0UHJvcHMiLCJzaW1wbGVFbmQiLCJ2YWx1ZVR5cGVFbmQiLCJzaW1wbGVzIiwidmFsdWVUeXBlcyIsImFkdmFuY2VkcyIsInRvdGFsTGVuZ3RoIiwiY2xvbmUiLCJlcnIiLCJhY3R1YWxDbGFzcyIsIkNDX1NVUFBPUlRfSklUIiwiY2FsbCIsInN1cGVyQ2FsbEJvdW5kZWQiLCJib3VuZFN1cGVyQ2FsbHMiLCJjdG9yTmFtZSIsImJvZHkiLCJjdG9yTGVuIiwidXNlVHJ5Q2F0Y2giLCJzdGFydHNXaXRoIiwiU05JUFBFVCIsIkNsYXNzIiwiX3N1cGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfX2N0b3JzX18iLCJvcmlnaW5DdG9yIiwiU3VwZXJDYWxsUmVnIiwicmV0IiwiZ2V0Q3RvcnMiLCJiYXNlT3JNaXhpbnMiLCJjb25jYXQiLCJiIiwiYmFzZU9yTWl4aW4iLCJiYXNlQ3RvcnMiLCJjIiwieHl6IiwiU3VwZXJDYWxsUmVnU3RyaWN0IiwiaGFzU3VwZXJDYWxsIiwiZnVuY05hbWUiLCJwZCIsInN1cGVyRnVuYyIsInRtcCIsInNsaWNlIiwicHJlcHJvY2Vzc0F0dHJzIiwiX192YWx1ZXNfXyIsImJhc2UiLCJfc2VhbGVkIiwiZXJyb3IiLCJzdGF0aWNzIiwic3RhdGljUHJvcE5hbWUiLCJ2YWxpZGF0ZU1ldGhvZFdpdGhQcm9wcyIsImVkaXRvciIsIl9yZWdpc3RlckVkaXRvclByb3BzIiwiX2Zhc3REZWZpbmUiLCJzZXJpYWxpemFibGVGaWVsZHMiLCJrZXlzIiwia2V5IiwiYXR0ciIsImtsYXNzIiwiY2hhaW4iLCJnZXRTdXBlciIsIlByaW1pdGl2ZVR5cGVzIiwiSW50ZWdlciIsIkZsb2F0IiwiQm9vbGVhbiIsIlN0cmluZyIsImF0dHJpYnV0ZXMiLCJ1c2VkSW5HZXR0ZXIiLCJFUlJfVHlwZSIsInByb3BOYW1lUHJlZml4IiwiaW5pdEF0dHJzIiwicHJpbWl0aXZlVHlwZSIsIl9zaG9ydCIsImdldFR5cGVDaGVja2VyX0VUIiwiU2NyaXB0VXVpZCIsIlNjcmlwdEFzc2V0IiwiaXNFbnVtIiwiZ2V0TGlzdCIsImdldE9ialR5cGVDaGVja2VyX0VUIiwicGFyc2VTaW1wbGVBdHRyIiwiYXR0ck5hbWUiLCJleHBlY3RUeXBlIiwiZWRpdG9yT25seSIsInJlYWRvbmx5Iiwic2VyaWFsaXphYmxlIiwiYW5pbWF0YWJsZSIsInZpc2libGUiLCJzdGFydHNXaXRoVVMiLCJjaGFyQ29kZUF0IiwicmFuZ2UiLCJtb2R1bGUiLCJleHBvcnRzIiwiZmFzdERlZmluZSIsImdldE5ld1ZhbHVlVHlwZUNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLEVBQUUsR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBaEI7O0FBQ0EsSUFBSUMsSUFBSSxHQUFHRCxPQUFPLENBQUMsVUFBRCxDQUFsQjs7QUFDQSxJQUFJRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxTQUFELENBQW5COztBQUNBLElBQUlHLG9CQUFvQixHQUFHRCxLQUFLLENBQUNFLG1CQUFqQztBQUNBLElBQUlDLGNBQWMsR0FBR0gsS0FBSyxDQUFDSSxhQUEzQjs7QUFDQSxJQUFJQyxJQUFJLEdBQUdQLE9BQU8sQ0FBQyxhQUFELENBQWxCOztBQUNBLElBQUlRLFNBQVMsR0FBR0QsSUFBSSxDQUFDQyxTQUFyQjs7QUFDQSxJQUFJQyxVQUFVLEdBQUdULE9BQU8sQ0FBQyxvQkFBRCxDQUF4Qjs7QUFDQUEsT0FBTyxDQUFDLG1CQUFELENBQVA7O0FBRUEsSUFBSVUsZUFBZSxHQUFHLENBQUMsTUFBRCxFQUFTLFNBQVQsRUFBb0IsUUFBcEIsRUFBOEIsTUFBOUIsRUFBc0MsVUFBdEMsRUFBa0QsWUFBbEQsRUFBZ0UsU0FBaEUsRUFBMkUsUUFBM0UsRUFBcUYsU0FBckYsQ0FBdEI7QUFFQSxJQUFJQyxtQkFBbUIsR0FBR0MsTUFBTSxJQUFJLENB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WUEsSUFBSVosT0FBSixFQUFhO0FBQ1QxRCxFQUFBQSxFQUFFLENBQUNzRyxLQUFILENBQVN2RCxPQUFULEVBQWtCK0wsTUFBTSxDQUFDQyxPQUF6QjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIGpzID0gcmVxdWlyZSgnLi9qcycpO1xyXG52YXIgRW51bSA9IHJlcXVpcmUoJy4vQ0NFbnVtJyk7XHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcclxudmFyIF9pc1BsYWluRW1wdHlPYmpfREVWID0gdXRpbHMuaXNQbGFpbkVtcHR5T2JqX0RFVjtcclxudmFyIF9jbG9uZWFibGVfREVWID0gdXRpbHMuY2xvbmVhYmxlX0RFVjtcclxudmFyIEF0dHIgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZScpO1xyXG52YXIgREVMSU1FVEVSID0gQXR0ci5ERUxJTUVURVI7XHJcbnZhciBwcmVwcm9jZXNzID0gcmVxdWlyZSgnLi9wcmVwcm9jZXNzLWNsYXNzJyk7XHJcbnJlcXVpcmUoJy4vcmVxdWlyaW5nLWZyYW1lJyk7XHJcblxyXG52YXIgQlVJTFRJTl9FTlRSSUVTID0gWyduYW1lJywgJ2V4dGVuZHMnLCAnbWl4aW5zJywgJ2N0b3InLCAnX19jdG9yX18nLCAncHJvcGVydGllcycsICdzdGF0aWNzJywgJ2VkaXRvcicsICdfX0VTNl9fJ107XHJcblxyXG52YXIgSU5WQUxJRF9TVEFUSUNTX0RFViA9IENDX0RFViAmJiBbJ25hbWUnLCAnX19jdG9yc19fJywgJ19fcHJvcHNfXycsICdfX3ZhbHVlc19fJywgJ2FyZ3VtZW50cycsICdjYWxsJywgJ2FwcGx5JywgJ2NhbGxlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJ2xlbmd0aCcsICdwcm90b3R5cGUnXTtcclxuXHJcbmZ1bmN0aW9uIHB1c2hVbmlxdWUgKGFycmF5LCBpdGVtKSB7XHJcbiAgICBpZiAoYXJyYXkuaW5kZXhPZihpdGVtKSA8IDApIHtcclxuICAgICAgICBhcnJheS5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgZGVmZXJyZWRJbml0aWFsaXplciA9IHtcclxuXHJcbiAgICAvLyBDb25maWdzIGZvciBjbGFzc2VzIHdoaWNoIG5lZWRzIGRlZmVycmVkIGluaXRpYWxpemF0aW9uXHJcbiAgICBkYXRhczogbnVsbCxcclxuXHJcbiAgICAvLyByZWdpc3RlciBuZXcgY2xhc3NcclxuICAgIC8vIGRhdGEgLSB7Y2xzOiBjbHMsIGNiOiBwcm9wZXJ0aWVzLCBtaXhpbnM6IG9wdGlvbnMubWl4aW5zfVxyXG4gICAgcHVzaDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhcykge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFzID0gW2RhdGFdO1xyXG4gICAgICAgICAgICAvLyBzdGFydCBhIG5ldyB0aW1lciB0byBpbml0aWFsaXplXHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmluaXQoKTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGFzID0gdGhpcy5kYXRhcztcclxuICAgICAgICBpZiAoZGF0YXMpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBkYXRhc1tpXTtcclxuICAgICAgICAgICAgICAgIHZhciBjbHMgPSBkYXRhLmNscztcclxuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzID0gZGF0YS5wcm9wcztcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcGVydGllcyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGpzLmdldENsYXNzTmFtZShjbHMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWNsYXJlUHJvcGVydGllcyhjbHMsIG5hbWUsIHByb3BlcnRpZXMsIGNscy4kc3VwZXIsIGRhdGEubWl4aW5zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzYzMywgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kYXRhcyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gYm90aCBnZXR0ZXIgYW5kIHByb3AgbXVzdCByZWdpc3RlciB0aGUgbmFtZSBpbnRvIF9fcHJvcHNfXyBhcnJheVxyXG5mdW5jdGlvbiBhcHBlbmRQcm9wIChjbHMsIG5hbWUpIHtcclxuICAgIGlmIChDQ19ERVYpIHtcclxuICAgICAgICAvL2lmICghSURFTlRJRklFUl9SRS50ZXN0KG5hbWUpKSB7XHJcbiAgICAgICAgLy8gICAgY2MuZXJyb3IoJ1RoZSBwcm9wZXJ0eSBuYW1lIFwiJyArIG5hbWUgKyAnXCIgaXMgbm90IGNvbXBsaWFudCB3aXRoIEphdmFTY3JpcHQgbmFtaW5nIHN0YW5kYXJkcycpO1xyXG4gICAgICAgIC8vICAgIHJldHVybjtcclxuICAgICAgICAvL31cclxuICAgICAgICBpZiAobmFtZS5pbmRleE9mKCcuJykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzYzNCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdXNoVW5pcXVlKGNscy5fX3Byb3BzX18sIG5hbWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWZpbmVQcm9wIChjbHMsIGNsYXNzTmFtZSwgcHJvcE5hbWUsIHZhbCwgZXM2KSB7XHJcbiAgICB2YXIgZGVmYXVsdFZhbHVlID0gdmFsLmRlZmF1bHQ7XHJcblxyXG4gICAgaWYgKENDX0RFVikge1xyXG4gICAgICAgIGlmICghZXM2KSB7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGRlZmF1bHQgb2JqZWN0IHZhbHVlXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnb2JqZWN0JyAmJiBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRlZmF1bHRWYWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBhcnJheSBlbXB0eVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM2MzUsIGNsYXNzTmFtZSwgcHJvcE5hbWUsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFfaXNQbGFpbkVtcHR5T2JqX0RFVihkZWZhdWx0VmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgY2xvbmVhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfY2xvbmVhYmxlX0RFVihkZWZhdWx0VmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzYzNiwgY2xhc3NOYW1lLCBwcm9wTmFtZSwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVjayBiYXNlIHByb3RvdHlwZSB0byBhdm9pZCBuYW1lIGNvbGxpc2lvblxyXG4gICAgICAgIGlmIChDQ0NsYXNzLmdldEluaGVyaXRhbmNlQ2hhaW4oY2xzKVxyXG4gICAgICAgICAgICAgICAgICAgLnNvbWUoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgucHJvdG90eXBlLmhhc093blByb3BlcnR5KHByb3BOYW1lKTsgfSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5lcnJvcklEKDM2MzcsIGNsYXNzTmFtZSwgcHJvcE5hbWUsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0IGRlZmF1bHQgdmFsdWVcclxuICAgIEF0dHIuc2V0Q2xhc3NBdHRyKGNscywgcHJvcE5hbWUsICdkZWZhdWx0JywgZGVmYXVsdFZhbHVlKTtcclxuXHJcbiAgICBhcHBlbmRQcm9wKGNscywgcHJvcE5hbWUpO1xyXG5cclxuICAgIC8vIGFwcGx5IGF0dHJpYnV0ZXNcclxuICAgIHBhcnNlQXR0cmlidXRlcyhjbHMsIHZhbCwgY2xhc3NOYW1lLCBwcm9wTmFtZSwgZmFsc2UpO1xyXG4gICAgaWYgKChDQ19FRElUT1IgJiYgIUVkaXRvci5pc0J1aWxkZXIpIHx8IENDX1RFU1QpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9uQWZ0ZXJQcm9wc19FVC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBvbkFmdGVyUHJvcHNfRVRbaV0oY2xzLCBwcm9wTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9uQWZ0ZXJQcm9wc19FVC5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWZpbmVHZXRTZXQgKGNscywgbmFtZSwgcHJvcE5hbWUsIHZhbCwgZXM2KSB7XHJcbiAgICB2YXIgZ2V0dGVyID0gdmFsLmdldDtcclxuICAgIHZhciBzZXR0ZXIgPSB2YWwuc2V0O1xyXG4gICAgdmFyIHByb3RvID0gY2xzLnByb3RvdHlwZTtcclxuICAgIHZhciBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgcHJvcE5hbWUpO1xyXG4gICAgdmFyIHNldHRlclVuZGVmaW5lZCA9ICFkO1xyXG5cclxuICAgIGlmIChnZXR0ZXIpIHtcclxuICAgICAgICBpZiAoQ0NfREVWICYmICFlczYgJiYgZCAmJiBkLmdldCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcklEKDM2MzgsIG5hbWUsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFyc2VBdHRyaWJ1dGVzKGNscywgdmFsLCBuYW1lLCBwcm9wTmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKChDQ19FRElUT1IgJiYgIUVkaXRvci5pc0J1aWxkZXIpIHx8IENDX1RFU1QpIHtcclxuICAgICAgICAgICAgb25BZnRlclByb3BzX0VULmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBBdHRyLnNldENsYXNzQXR0cihjbHMsIHByb3BOYW1lLCAnc2VyaWFsaXphYmxlJywgZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgICAgIC8vIOS4jeiuuuaYr+WQpiB2aXNpYmxlIOmDveimgea3u+WKoOWIsCBwcm9wc++8jOWQpuWImSBhc3NldCB3YXRjaGVyIOS4jeiDveato+W4uOW3peS9nFxyXG4gICAgICAgICAgICBhcHBlbmRQcm9wKGNscywgcHJvcE5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFlczYpIHtcclxuICAgICAgICAgICAganMuZ2V0KHByb3RvLCBwcm9wTmFtZSwgZ2V0dGVyLCBzZXR0ZXJVbmRlZmluZWQsIHNldHRlclVuZGVmaW5lZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQ0NfRURJVE9SIHx8IENDX0RFVikge1xyXG4gICAgICAgICAgICBBdHRyLnNldENsYXNzQXR0cihjbHMsIHByb3BOYW1lLCAnaGFzR2V0dGVyJywgdHJ1ZSk7IC8vIOaWueS+vyBlZGl0b3Ig5YGa5Yik5patXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZXR0ZXIpIHtcclxuICAgICAgICBpZiAoIWVzNikge1xyXG4gICAgICAgICAgICBpZiAoQ0NfREVWICYmIGQgJiYgZC5zZXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYy5lcnJvcklEKDM2NDAsIG5hbWUsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBqcy5zZXQocHJvdG8sIHByb3BOYW1lLCBzZXR0ZXIsIHNldHRlclVuZGVmaW5lZCwgc2V0dGVyVW5kZWZpbmVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKENDX0VESVRPUiB8fCBDQ19ERVYpIHtcclxuICAgICAgICAgICAgQXR0ci5zZXRDbGFzc0F0dHIoY2xzLCBwcm9wTmFtZSwgJ2hhc1NldHRlcicsIHRydWUpOyAvLyDmlrnkvr8gZWRpdG9yIOWBmuWIpOaWrVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdCAoZGVmYXVsdFZhbCkge1xyXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0VmFsID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY2MuX3Rocm93KGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmYXVsdFZhbDtcclxufVxyXG5cclxuZnVuY3Rpb24gbWl4aW5XaXRoSW5oZXJpdGVkIChkZXN0LCBzcmMsIGZpbHRlcikge1xyXG4gICAgZm9yICh2YXIgcHJvcCBpbiBzcmMpIHtcclxuICAgICAgICBpZiAoIWRlc3QuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHByb3ApKSkge1xyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgcHJvcCwganMuZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHNyYywgcHJvcCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZG9EZWZpbmUgKGNsYXNzTmFtZSwgYmFzZUNsYXNzLCBtaXhpbnMsIG9wdGlvbnMpIHtcclxuICAgIHZhciBzaG91bGRBZGRQcm90b0N0b3I7XHJcbiAgICB2YXIgX19jdG9yX18gPSBvcHRpb25zLl9fY3Rvcl9fO1xyXG4gICAgdmFyIGN0b3IgPSBvcHRpb25zLmN0b3I7XHJcbiAgICB2YXIgX19lczZfXyA9IG9wdGlvbnMuX19FUzZfXztcclxuXHJcbiAgICBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgY3RvclxyXG4gICAgICAgIHZhciBjdG9yVG9Vc2UgPSBfX2N0b3JfXyB8fCBjdG9yO1xyXG4gICAgICAgIGlmIChjdG9yVG9Vc2UpIHtcclxuICAgICAgICAgICAgaWYgKENDQ2xhc3MuX2lzQ0NDbGFzcyhjdG9yVG9Vc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM2MTgsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGN0b3JUb1VzZSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgzNjE5LCBjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VDbGFzcyAmJiAvXFxicHJvdG90eXBlLmN0b3JcXGIvLnRlc3QoY3RvclRvVXNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfX2VzNl9fKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzY1MSwgY2xhc3NOYW1lIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDM2MDAsIGNsYXNzTmFtZSB8fCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkQWRkUHJvdG9DdG9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGN0b3IpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfX2N0b3JfXykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzY0OSwgY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0b3IgPSBvcHRpb25zLmN0b3IgPSBfdmFsaWRhdGVDdG9yX0RFVihjdG9yLCBiYXNlQ2xhc3MsIGNsYXNzTmFtZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGN0b3JzO1xyXG4gICAgdmFyIGZpcmVDbGFzcztcclxuICAgIGlmIChfX2VzNl9fKSB7XHJcbiAgICAgICAgY3RvcnMgPSBbY3Rvcl07XHJcbiAgICAgICAgZmlyZUNsYXNzID0gY3RvcjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGN0b3JzID0gX19jdG9yX18gPyBbX19jdG9yX19dIDogX2dldEFsbEN0b3JzKGJhc2VDbGFzcywgbWl4aW5zLCBvcHRpb25zKTtcclxuICAgICAgICBmaXJlQ2xhc3MgPSBfY3JlYXRlQ3RvcihjdG9ycywgYmFzZUNsYXNzLCBjbGFzc05hbWUsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBleHRlbmQgLSBDcmVhdGUgYSBuZXcgQ2xhc3MgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgQ2xhc3NcclxuICAgICAgICBqcy52YWx1ZShmaXJlQ2xhc3MsICdleHRlbmQnLCBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBvcHRpb25zLmV4dGVuZHMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gQ0NDbGFzcyhvcHRpb25zKTtcclxuICAgICAgICB9LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBqcy52YWx1ZShmaXJlQ2xhc3MsICdfX2N0b3JzX18nLCBjdG9ycy5sZW5ndGggPiAwID8gY3RvcnMgOiBudWxsLCB0cnVlKTtcclxuXHJcblxyXG4gICAgdmFyIHByb3RvdHlwZSA9IGZpcmVDbGFzcy5wcm90b3R5cGU7XHJcbiAgICBpZiAoYmFzZUNsYXNzKSB7XHJcbiAgICAgICAgaWYgKCFfX2VzNl9fKSB7XHJcbiAgICAgICAgICAgIGpzLmV4dGVuZChmaXJlQ2xhc3MsIGJhc2VDbGFzcyk7ICAgICAgICAvLyDov5nph4zkvJrmiorniLbnsbvnmoQgX19wcm9wc19fIOWkjeWItue7meWtkOexu1xyXG4gICAgICAgICAgICBwcm90b3R5cGUgPSBmaXJlQ2xhc3MucHJvdG90eXBlOyAgICAgICAgLy8gZ2V0IGV4dGVuZGVkIHByb3RvdHlwZVxyXG4gICAgICAgIH1cclxuICAgICAgICBmaXJlQ2xhc3MuJHN1cGVyID0gYmFzZUNsYXNzO1xyXG4gICAgICAgIGlmIChDQ19ERVYgJiYgc2hvdWxkQWRkUHJvdG9DdG9yKSB7XHJcbiAgICAgICAgICAgIHByb3RvdHlwZS5jdG9yID0gZnVuY3Rpb24gKCkge307XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChtaXhpbnMpIHtcclxuICAgICAgICBmb3IgKHZhciBtID0gbWl4aW5zLmxlbmd0aCAtIDE7IG0gPj0gMDsgbS0tKSB7XHJcbiAgICAgICAgICAgIHZhciBtaXhpbiA9IG1peGluc1ttXTtcclxuICAgICAgICAgICAgbWl4aW5XaXRoSW5oZXJpdGVkKHByb3RvdHlwZSwgbWl4aW4ucHJvdG90eXBlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG1peGluIHN0YXRpY3MgKHRoaXMgd2lsbCBhbHNvIGNvcHkgZWRpdG9yIGF0dHJpYnV0ZXMgZm9yIGNvbXBvbmVudClcclxuICAgICAgICAgICAgbWl4aW5XaXRoSW5oZXJpdGVkKGZpcmVDbGFzcywgbWl4aW4sIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWl4aW4uaGFzT3duUHJvcGVydHkocHJvcCkgJiYgKCFDQ19ERVYgfHwgSU5WQUxJRF9TVEFUSUNTX0RFVi5pbmRleE9mKHByb3ApIDwgMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gbWl4aW4gYXR0cmlidXRlc1xyXG4gICAgICAgICAgICBpZiAoQ0NDbGFzcy5faXNDQ0NsYXNzKG1peGluKSkge1xyXG4gICAgICAgICAgICAgICAgbWl4aW5XaXRoSW5oZXJpdGVkKEF0dHIuZ2V0Q2xhc3NBdHRycyhmaXJlQ2xhc3MpLCBBdHRyLmdldENsYXNzQXR0cnMobWl4aW4pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXN0b3JlIGNvbnN0dWN0b3Igb3ZlcnJpZGRlbiBieSBtaXhpblxyXG4gICAgICAgIHByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGZpcmVDbGFzcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9fZXM2X18pIHtcclxuICAgICAgICBwcm90b3R5cGUuX19pbml0UHJvcHNfXyA9IGNvbXBpbGVQcm9wcztcclxuICAgIH1cclxuXHJcbiAgICBqcy5zZXRDbGFzc05hbWUoY2xhc3NOYW1lLCBmaXJlQ2xhc3MpO1xyXG4gICAgcmV0dXJuIGZpcmVDbGFzcztcclxufVxyXG5cclxuZnVuY3Rpb24gZGVmaW5lIChjbGFzc05hbWUsIGJhc2VDbGFzcywgbWl4aW5zLCBvcHRpb25zKSB7XHJcbiAgICB2YXIgQ29tcG9uZW50ID0gY2MuQ29tcG9uZW50O1xyXG4gICAgdmFyIGZyYW1lID0gY2MuX1JGLnBlZWsoKTtcclxuICAgIGlmIChmcmFtZSAmJiBqcy5pc0NoaWxkQ2xhc3NPZihiYXNlQ2xhc3MsIENvbXBvbmVudCkpIHtcclxuICAgICAgICAvLyBwcm9qZWN0IGNvbXBvbmVudFxyXG4gICAgICAgIGlmIChqcy5pc0NoaWxkQ2xhc3NPZihmcmFtZS5jbHMsIENvbXBvbmVudCkpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3JJRCgzNjE1KTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChDQ19ERVYgJiYgZnJhbWUudXVpZCAmJiBjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDM2MTYsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBmcmFtZS5zY3JpcHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNscyA9IGRvRGVmaW5lKGNsYXNzTmFtZSwgYmFzZUNsYXNzLCBtaXhpbnMsIG9wdGlvbnMpO1xyXG5cclxuICAgIGlmIChmcmFtZSkge1xyXG4gICAgICAgIGlmIChqcy5pc0NoaWxkQ2xhc3NPZihiYXNlQ2xhc3MsIENvbXBvbmVudCkpIHtcclxuICAgICAgICAgICAgdmFyIHV1aWQgPSBmcmFtZS51dWlkO1xyXG4gICAgICAgICAgICBpZiAodXVpZCkge1xyXG4gICAgICAgICAgICAgICAganMuX3NldENsYXNzSWQodXVpZCwgY2xzKTtcclxuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgICAgICAgICBDb21wb25lbnQuX2FkZE1lbnVJdGVtKGNscywgJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5zY3JpcHRzLycgKyBjbGFzc05hbWUsIC0xKTtcclxuICAgICAgICAgICAgICAgICAgICBjbHMucHJvdG90eXBlLl9fc2NyaXB0VXVpZCA9IEVkaXRvci5VdGlscy5VdWlkVXRpbHMuZGVjb21wcmVzc1V1aWQodXVpZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnJhbWUuY2xzID0gY2xzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghanMuaXNDaGlsZENsYXNzT2YoZnJhbWUuY2xzLCBDb21wb25lbnQpKSB7XHJcbiAgICAgICAgICAgIGZyYW1lLmNscyA9IGNscztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2xzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBub3JtYWxpemVDbGFzc05hbWVfREVWIChjbGFzc05hbWUpIHtcclxuICAgIHZhciBEZWZhdWx0TmFtZSA9ICdDQ0NsYXNzJztcclxuICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUucmVwbGFjZSgvXlteJEEtWmEtel9dLywgJ18nKS5yZXBsYWNlKC9bXjAtOUEtWmEtel8kXS9nLCAnXycpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHZhbGlkYXRlIG5hbWVcclxuICAgICAgICAgICAgRnVuY3Rpb24oJ2Z1bmN0aW9uICcgKyBjbGFzc05hbWUgKyAnKCl7fScpKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRGVmYXVsdE5hbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE5ld1ZhbHVlVHlwZUNvZGVKaXQgKHZhbHVlKSB7XHJcbiAgICB2YXIgY2xzTmFtZSA9IGpzLmdldENsYXNzTmFtZSh2YWx1ZSk7XHJcbiAgICB2YXIgdHlwZSA9IHZhbHVlLmNvbnN0cnVjdG9yO1xyXG4gICAgdmFyIHJlcyA9ICduZXcgJyArIGNsc05hbWUgKyAnKCc7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGUuX19wcm9wc19fLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHByb3AgPSB0eXBlLl9fcHJvcHNfX1tpXTtcclxuICAgICAgICB2YXIgcHJvcFZhbCA9IHZhbHVlW3Byb3BdO1xyXG4gICAgICAgIGlmIChDQ19ERVYgJiYgdHlwZW9mIHByb3BWYWwgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzY0MSwgY2xzTmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAnbmV3ICcgKyBjbHNOYW1lICsgJygpJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzICs9IHByb3BWYWw7XHJcbiAgICAgICAgaWYgKGkgPCB0eXBlLl9fcHJvcHNfXy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHJlcyArPSAnLCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcyArICcpJztcclxufVxyXG5cclxuLy8gVE9ETyAtIG1vdmUgZXNjYXBlRm9ySlMsIElERU5USUZJRVJfUkUsIGdldE5ld1ZhbHVlVHlwZUNvZGVKaXQgdG8gbWlzYy5qcyBvciBhIG5ldyBzb3VyY2UgZmlsZVxyXG5cclxuLy8gY29udmVydCBhIG5vcm1hbCBzdHJpbmcgaW5jbHVkaW5nIG5ld2xpbmVzLCBxdW90ZXMgYW5kIHVuaWNvZGUgY2hhcmFjdGVycyBpbnRvIGEgc3RyaW5nIGxpdGVyYWxcclxuLy8gcmVhZHkgdG8gdXNlIGluIEphdmFTY3JpcHQgc291cmNlXHJcbmZ1bmN0aW9uIGVzY2FwZUZvckpTIChzKSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocykuXHJcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0pTT04vc3RyaW5naWZ5XHJcbiAgICAgICAgcmVwbGFjZSgvXFx1MjAyOC9nLCAnXFxcXHUyMDI4JykuXHJcbiAgICAgICAgcmVwbGFjZSgvXFx1MjAyOS9nLCAnXFxcXHUyMDI5Jyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEluaXRQcm9wc0ppdCAoYXR0cnMsIHByb3BMaXN0KSB7XHJcbiAgICAvLyBmdW5jdGlvbnMgZm9yIGdlbmVyYXRlZCBjb2RlXHJcbiAgICB2YXIgRiA9IFtdO1xyXG4gICAgdmFyIGZ1bmMgPSAnJztcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHByb3AgPSBwcm9wTGlzdFtpXTtcclxuICAgICAgICB2YXIgYXR0cktleSA9IHByb3AgKyBERUxJTUVURVIgKyAnZGVmYXVsdCc7XHJcbiAgICAgICAgaWYgKGF0dHJLZXkgaW4gYXR0cnMpIHsgIC8vIGdldHRlciBkb2VzIG5vdCBoYXZlIGRlZmF1bHRcclxuICAgICAgICAgICAgdmFyIHN0YXRlbWVudDtcclxuICAgICAgICAgICAgaWYgKElERU5USUZJRVJfUkUudGVzdChwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gJ3RoaXMuJyArIHByb3AgKyAnPSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSAndGhpc1snICsgZXNjYXBlRm9ySlMocHJvcCkgKyAnXT0nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBleHByZXNzaW9uO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gYXR0cnNbYXR0cktleV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmID09PSAnb2JqZWN0JyAmJiBkZWYpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZWYgaW5zdGFuY2VvZiBjYy5WYWx1ZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uID0gZ2V0TmV3VmFsdWVUeXBlQ29kZUppdChkZWYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkZWYpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9ICdbXSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uID0gJ3t9JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBGLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIEYucHVzaChkZWYpO1xyXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9ICdGWycgKyBpbmRleCArICddKCknO1xyXG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmMgKz0gJ3RyeSB7XFxuJyArIHN0YXRlbWVudCArIGV4cHJlc3Npb24gKyAnO1xcbn1cXG5jYXRjaChlKSB7XFxuY2MuX3Rocm93KGUpO1xcbicgKyBzdGF0ZW1lbnQgKyAndW5kZWZpbmVkO1xcbn1cXG4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkZWYgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uID0gZXNjYXBlRm9ySlMoZGVmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIG51bWJlciwgYm9vbGVhbiwgbnVsbCwgdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uID0gZGVmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0YXRlbWVudCA9IHN0YXRlbWVudCArIGV4cHJlc3Npb24gKyAnO1xcbic7XHJcbiAgICAgICAgICAgIGZ1bmMgKz0gc3RhdGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiAoQ0NfVEVTVCAmJiAhaXNQaGFudG9tSlMpIHtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhmdW5jKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICB2YXIgaW5pdFByb3BzO1xyXG4gICAgaWYgKEYubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgaW5pdFByb3BzID0gRnVuY3Rpb24oZnVuYyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpbml0UHJvcHMgPSBGdW5jdGlvbignRicsICdyZXR1cm4gKGZ1bmN0aW9uKCl7XFxuJyArIGZ1bmMgKyAnfSknKShGKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5pdFByb3BzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRJbml0UHJvcHMgKGF0dHJzLCBwcm9wTGlzdCkge1xyXG4gICAgdmFyIHByb3BzID0gbnVsbDtcclxuICAgIHZhciBzaW1wbGVFbmQgPSAwO1xyXG4gICAgdmFyIHZhbHVlVHlwZUVuZCA9IDA7XHJcblxyXG4gICAgKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy8gdHJpYWdlIHByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgdmFyIHNpbXBsZXMgPSBudWxsO1xyXG4gICAgICAgIHZhciB2YWx1ZVR5cGVzID0gbnVsbDtcclxuICAgICAgICB2YXIgYWR2YW5jZWRzID0gbnVsbDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wTGlzdC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgcHJvcCA9IHByb3BMaXN0W2ldO1xyXG4gICAgICAgICAgICB2YXIgYXR0cktleSA9IHByb3AgKyBERUxJTUVURVIgKyAnZGVmYXVsdCc7XHJcbiAgICAgICAgICAgIGlmIChhdHRyS2V5IGluIGF0dHJzKSB7IC8vIGdldHRlciBkb2VzIG5vdCBoYXZlIGRlZmF1bHRcclxuICAgICAgICAgICAgICAgIHZhciBkZWYgPSBhdHRyc1thdHRyS2V5XTtcclxuICAgICAgICAgICAgICAgIGlmICgodHlwZW9mIGRlZiA9PT0gJ29iamVjdCcgJiYgZGVmKSB8fCB0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZiBpbnN0YW5jZW9mIGNjLlZhbHVlVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlVHlwZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVR5cGVzLnB1c2gocHJvcCwgZGVmKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWR2YW5jZWRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlZHMucHVzaChwcm9wLCBkZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG51bWJlciwgYm9vbGVhbiwgbnVsbCwgdW5kZWZpbmVkLCBzdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNpbXBsZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2ltcGxlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzaW1wbGVzLnB1c2gocHJvcCwgZGVmKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uY2F0IGluIGNvbXBhY3QgbWVtb3J5XHJcblxyXG4gICAgICAgIHNpbXBsZUVuZCA9IHNpbXBsZXMgPyBzaW1wbGVzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgdmFsdWVUeXBlRW5kID0gc2ltcGxlRW5kICsgKHZhbHVlVHlwZXMgPyB2YWx1ZVR5cGVzLmxlbmd0aCA6IDApO1xyXG4gICAgICAgIGxldCB0b3RhbExlbmd0aCA9IHZhbHVlVHlwZUVuZCArIChhZHZhbmNlZHMgPyBhZHZhbmNlZHMubGVuZ3RoIDogMCk7XHJcbiAgICAgICAgcHJvcHMgPSBuZXcgQXJyYXkodG90YWxMZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpbXBsZUVuZDsgKytpKSB7XHJcbiAgICAgICAgICAgIHByb3BzW2ldID0gc2ltcGxlc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHNpbXBsZUVuZDsgaSA8IHZhbHVlVHlwZUVuZDsgKytpKSB7XHJcbiAgICAgICAgICAgIHByb3BzW2ldID0gdmFsdWVUeXBlc1tpIC0gc2ltcGxlRW5kXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHZhbHVlVHlwZUVuZDsgaSA8IHRvdGFsTGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgcHJvcHNbaV0gPSBhZHZhbmNlZHNbaSAtIHZhbHVlVHlwZUVuZF07XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBmb3IgKDsgaSA8IHNpbXBsZUVuZDsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXNbcHJvcHNbaV1dID0gcHJvcHNbaSArIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKDsgaSA8IHZhbHVlVHlwZUVuZDsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXNbcHJvcHNbaV1dID0gcHJvcHNbaSArIDFdLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoOyBpIDwgcHJvcHMubGVuZ3RoOyBpICs9IDIpIHtcclxuICAgICAgICAgICAgdmFyIGRlZiA9IHByb3BzW2kgKyAxXTtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc1twcm9wc1tpXV0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWYgaXMgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlZigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLl90aHJvdyhlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXNbcHJvcHNbaV1dID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG4vLyBzaW1wbGUgdGVzdCB2YXJpYWJsZSBuYW1lXHJcbnZhciBJREVOVElGSUVSX1JFID0gL15bQS1aYS16XyRdWzAtOUEtWmEtel8kXSokLztcclxuZnVuY3Rpb24gY29tcGlsZVByb3BzIChhY3R1YWxDbGFzcykge1xyXG4gICAgLy8gaW5pdCBkZWZlcnJlZCBwcm9wZXJ0aWVzXHJcbiAgICB2YXIgYXR0cnMgPSBBdHRyLmdldENsYXNzQXR0cnMoYWN0dWFsQ2xhc3MpO1xyXG4gICAgdmFyIHByb3BMaXN0ID0gYWN0dWFsQ2xhc3MuX19wcm9wc19fO1xyXG4gICAgaWYgKHByb3BMaXN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgZGVmZXJyZWRJbml0aWFsaXplci5pbml0KCk7XHJcbiAgICAgICAgcHJvcExpc3QgPSBhY3R1YWxDbGFzcy5fX3Byb3BzX187XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3ZlcndpdGUgX19pbml0UHJvcHNfXyB0byBhdm9pZCBjb21waWxlIGFnYWluLlxyXG4gICAgdmFyIGluaXRQcm9wcyA9IENDX1NVUFBPUlRfSklUID8gZ2V0SW5pdFByb3BzSml0KGF0dHJzLCBwcm9wTGlzdCkgOiBnZXRJbml0UHJvcHMoYXR0cnMsIHByb3BMaXN0KTtcclxuICAgIGFjdHVhbENsYXNzLnByb3RvdHlwZS5fX2luaXRQcm9wc19fID0gaW5pdFByb3BzO1xyXG5cclxuICAgIC8vIGNhbGwgaW5zdGFudGlhdGVQcm9wcyBpbW1lZGlhdGVseSwgbm8gbmVlZCB0byBwYXNzIGFjdHVhbENsYXNzIGludG8gaXQgYW55bW9yZVxyXG4gICAgLy8gKHVzZSBjYWxsIHRvIG1hbnVhbGx5IGJpbmQgYHRoaXNgIGJlY2F1c2UgYHRoaXNgIG1heSBub3QgaW5zdGFuY2VvZiBhY3R1YWxDbGFzcylcclxuICAgIGluaXRQcm9wcy5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG52YXIgX2NyZWF0ZUN0b3IgPSBDQ19TVVBQT1JUX0pJVCA/IGZ1bmN0aW9uIChjdG9ycywgYmFzZUNsYXNzLCBjbGFzc05hbWUsIG9wdGlvbnMpIHtcclxuICAgIHZhciBzdXBlckNhbGxCb3VuZGVkID0gYmFzZUNsYXNzICYmIGJvdW5kU3VwZXJDYWxscyhiYXNlQ2xhc3MsIG9wdGlvbnMsIGNsYXNzTmFtZSk7XHJcblxyXG4gICAgdmFyIGN0b3JOYW1lID0gQ0NfREVWID8gbm9ybWFsaXplQ2xhc3NOYW1lX0RFVihjbGFzc05hbWUpIDogJ0NDQ2xhc3MnO1xyXG4gICAgdmFyIGJvZHkgPSAncmV0dXJuIGZ1bmN0aW9uICcgKyBjdG9yTmFtZSArICcoKXtcXG4nO1xyXG5cclxuICAgIGlmIChzdXBlckNhbGxCb3VuZGVkKSB7XHJcbiAgICAgICAgYm9keSArPSAndGhpcy5fc3VwZXI9bnVsbDtcXG4nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGluc3RhbnRpYXRlIHByb3BzXHJcbiAgICBib2R5ICs9ICd0aGlzLl9faW5pdFByb3BzX18oJyArIGN0b3JOYW1lICsgJyk7XFxuJztcclxuXHJcbiAgICAvLyBjYWxsIHVzZXIgY29uc3RydWN0b3JzXHJcbiAgICB2YXIgY3RvckxlbiA9IGN0b3JzLmxlbmd0aDtcclxuICAgIGlmIChjdG9yTGVuID4gMCkge1xyXG4gICAgICAgIHZhciB1c2VUcnlDYXRjaCA9IENDX0RFViAmJiAhIChjbGFzc05hbWUgJiYgY2xhc3NOYW1lLnN0YXJ0c1dpdGgoJ2NjLicpKTtcclxuICAgICAgICBpZiAodXNlVHJ5Q2F0Y2gpIHtcclxuICAgICAgICAgICAgYm9keSArPSAndHJ5e1xcbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBTTklQUEVUID0gJ10uYXBwbHkodGhpcyxhcmd1bWVudHMpO1xcbic7XHJcbiAgICAgICAgaWYgKGN0b3JMZW4gPT09IDEpIHtcclxuICAgICAgICAgICAgYm9keSArPSBjdG9yTmFtZSArICcuX19jdG9yc19fWzAnICsgU05JUFBFVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGJvZHkgKz0gJ3ZhciBjcz0nICsgY3Rvck5hbWUgKyAnLl9fY3RvcnNfXztcXG4nO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN0b3JMZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYm9keSArPSAnY3NbJyArIGkgKyBTTklQUEVUO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1c2VUcnlDYXRjaCkge1xyXG4gICAgICAgICAgICBib2R5ICs9ICd9Y2F0Y2goZSl7XFxuJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdjYy5fdGhyb3coZSk7XFxuJyArXHJcbiAgICAgICAgICAgICAgICAgICAgJ31cXG4nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGJvZHkgKz0gJ30nO1xyXG5cclxuICAgIHJldHVybiBGdW5jdGlvbihib2R5KSgpO1xyXG59IDogZnVuY3Rpb24gKGN0b3JzLCBiYXNlQ2xhc3MsIGNsYXNzTmFtZSwgb3B0aW9ucykge1xyXG4gICAgdmFyIHN1cGVyQ2FsbEJvdW5kZWQgPSBiYXNlQ2xhc3MgJiYgYm91bmRTdXBlckNhbGxzKGJhc2VDbGFzcywgb3B0aW9ucywgY2xhc3NOYW1lKTtcclxuICAgIHZhciBjdG9yTGVuID0gY3RvcnMubGVuZ3RoO1xyXG5cclxuICAgIHZhciBDbGFzcztcclxuXHJcbiAgICBpZiAoY3RvckxlbiA+IDApIHtcclxuICAgICAgICBpZiAoc3VwZXJDYWxsQm91bmRlZCkge1xyXG4gICAgICAgICAgICBpZiAoY3RvckxlbiA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgLy8gVXNlciBDb21wb25lbnRcclxuICAgICAgICAgICAgICAgIENsYXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW5pdFByb3BzX18oQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0b3JzWzBdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3RvcnNbMV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBDbGFzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdXBlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2luaXRQcm9wc19fKENsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN0b3JzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0b3JzW2ldLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGN0b3JMZW4gPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIC8vIE5vZGVcclxuICAgICAgICAgICAgICAgIENsYXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbml0UHJvcHNfXyhDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3RvcnNbMF0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICBjdG9yc1sxXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0b3JzWzJdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2luaXRQcm9wc19fKENsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3RvcnMgPSBDbGFzcy5fX2N0b3JzX187XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdG9ycy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdG9yc1tpXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBDbGFzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHN1cGVyQ2FsbEJvdW5kZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9faW5pdFByb3BzX18oQ2xhc3MpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ2xhc3M7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBfdmFsaWRhdGVDdG9yX0RFViAoY3RvciwgYmFzZUNsYXNzLCBjbGFzc05hbWUsIG9wdGlvbnMpIHtcclxuICAgIGlmIChDQ19FRElUT1IgJiYgYmFzZUNsYXNzKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgc3VwZXIgY2FsbCBpbiBjb25zdHJ1Y3RvclxyXG4gICAgICAgIHZhciBvcmlnaW5DdG9yID0gY3RvcjtcclxuICAgICAgICBpZiAoU3VwZXJDYWxsUmVnLnRlc3QoY3RvcikpIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuX19FUzZfXykge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgzNjUxLCBjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDM2MDAsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBzdXBwcmVzc3Mgc3VwZXIgY2FsbFxyXG4gICAgICAgICAgICAgICAgY3RvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdXBlciA9IGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXQgPSBvcmlnaW5DdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIGN0b3JcclxuICAgIGlmIChjdG9yLmxlbmd0aCA+IDAgJiYgKCFjbGFzc05hbWUgfHwgIWNsYXNzTmFtZS5zdGFydHNXaXRoKCdjYy4nKSkpIHtcclxuICAgICAgICAvLyBUbyBtYWtlIGEgdW5pZmllZCBDQ0NsYXNzIHNlcmlhbGl6YXRpb24gcHJvY2VzcyxcclxuICAgICAgICAvLyB3ZSBkb24ndCBhbGxvdyBwYXJhbWV0ZXJzIGZvciBjb25zdHJ1Y3RvciB3aGVuIGNyZWF0aW5nIGluc3RhbmNlcyBvZiBDQ0NsYXNzLlxyXG4gICAgICAgIC8vIEZvciBhZHZhbmNlZCB1c2VyLCBjb25zdHJ1Y3QgYXJndW1lbnRzIGNhbiBzdGlsbCBnZXQgZnJvbSAnYXJndW1lbnRzJy5cclxuICAgICAgICBjYy53YXJuSUQoMzYxNywgY2xhc3NOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3RvcjtcclxufVxyXG5cclxuZnVuY3Rpb24gX2dldEFsbEN0b3JzIChiYXNlQ2xhc3MsIG1peGlucywgb3B0aW9ucykge1xyXG4gICAgLy8gZ2V0IGJhc2UgdXNlciBjb25zdHJ1Y3RvcnNcclxuICAgIGZ1bmN0aW9uIGdldEN0b3JzIChjbHMpIHtcclxuICAgICAgICBpZiAoQ0NDbGFzcy5faXNDQ0NsYXNzKGNscykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNscy5fX2N0b3JzX18gfHwgW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW2Nsc107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjdG9ycyA9IFtdO1xyXG4gICAgLy8gaWYgKG9wdGlvbnMuX19FUzZfXykge1xyXG4gICAgLy8gICAgIGlmIChtaXhpbnMpIHtcclxuICAgIC8vICAgICAgICAgbGV0IGJhc2VPck1peGlucyA9IGdldEN0b3JzKGJhc2VDbGFzcyk7XHJcbiAgICAvLyAgICAgICAgIGZvciAobGV0IGIgPSAwOyBiIDwgbWl4aW5zLmxlbmd0aDsgYisrKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbWl4aW4gPSBtaXhpbnNbYl07XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAobWl4aW4pIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgYmFzZUN0b3JzID0gZ2V0Q3RvcnMobWl4aW4pO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgYmFzZUN0b3JzLmxlbmd0aDsgYysrKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlT3JNaXhpbnMuaW5kZXhPZihiYXNlQ3RvcnNbY10pIDwgMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFVuaXF1ZShjdG9ycywgYmFzZUN0b3JzW2NdKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIC8vIGVsc2Uge1xyXG4gICAgbGV0IGJhc2VPck1peGlucyA9IFtiYXNlQ2xhc3NdLmNvbmNhdChtaXhpbnMpO1xyXG4gICAgZm9yIChsZXQgYiA9IDA7IGIgPCBiYXNlT3JNaXhpbnMubGVuZ3RoOyBiKyspIHtcclxuICAgICAgICBsZXQgYmFzZU9yTWl4aW4gPSBiYXNlT3JNaXhpbnNbYl07XHJcbiAgICAgICAgaWYgKGJhc2VPck1peGluKSB7XHJcbiAgICAgICAgICAgIGxldCBiYXNlQ3RvcnMgPSBnZXRDdG9ycyhiYXNlT3JNaXhpbik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgYmFzZUN0b3JzLmxlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICBwdXNoVW5pcXVlKGN0b3JzLCBiYXNlQ3RvcnNbY10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGFwcGVuZCBzdWJjbGFzcyB1c2VyIGNvbnN0cnVjdG9yc1xyXG4gICAgdmFyIGN0b3IgPSBvcHRpb25zLmN0b3I7XHJcbiAgICBpZiAoY3Rvcikge1xyXG4gICAgICAgIGN0b3JzLnB1c2goY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN0b3JzO1xyXG59XHJcblxyXG52YXIgU3VwZXJDYWxsUmVnID0gL3h5ei8udGVzdChmdW5jdGlvbigpe3h5en0pID8gL1xcYlxcLl9zdXBlclxcYi8gOiAvLiovO1xyXG52YXIgU3VwZXJDYWxsUmVnU3RyaWN0ID0gL3h5ei8udGVzdChmdW5jdGlvbigpe3h5en0pID8gL3RoaXNcXC5fc3VwZXJcXHMqXFwoLyA6IC8oTk9ORSl7OTl9LztcclxuZnVuY3Rpb24gYm91bmRTdXBlckNhbGxzIChiYXNlQ2xhc3MsIG9wdGlvbnMsIGNsYXNzTmFtZSkge1xyXG4gICAgdmFyIGhhc1N1cGVyQ2FsbCA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgZnVuY05hbWUgaW4gb3B0aW9ucykge1xyXG4gICAgICAgIGlmIChCVUlMVElOX0VOVFJJRVMuaW5kZXhPZihmdW5jTmFtZSkgPj0gMCkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBvcHRpb25zW2Z1bmNOYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwZCA9IGpzLmdldFByb3BlcnR5RGVzY3JpcHRvcihiYXNlQ2xhc3MucHJvdG90eXBlLCBmdW5jTmFtZSk7XHJcbiAgICAgICAgaWYgKHBkKSB7XHJcbiAgICAgICAgICAgIHZhciBzdXBlckZ1bmMgPSBwZC52YWx1ZTtcclxuICAgICAgICAgICAgLy8gaWdub3JlIHBkLmdldCwgYXNzdW1lIHRoYXQgZnVuY3Rpb24gZGVmaW5lZCBieSBnZXR0ZXIgaXMganVzdCBmb3Igd2FybmluZ3NcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdXBlckZ1bmMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGlmIChTdXBlckNhbGxSZWcudGVzdChmdW5jKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1N1cGVyQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYm91bmRTdXBlckNhbGxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2Z1bmNOYW1lXSA9IChmdW5jdGlvbiAoc3VwZXJGdW5jLCBmdW5jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gdGhpcy5fc3VwZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGEgbmV3IC5fc3VwZXIoKSBtZXRob2QgdGhhdCBpcyB0aGUgc2FtZSBtZXRob2QgYnV0IG9uIHRoZSBzdXBlci1DbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBzdXBlckZ1bmM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbWV0aG9kIG9ubHkgbmVlZCB0byBiZSBib3VuZCB0ZW1wb3JhcmlseSwgc28gd2UgcmVtb3ZlIGl0IHdoZW4gd2UncmUgZG9uZSBleGVjdXRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gdG1wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoc3VwZXJGdW5jLCBmdW5jKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChDQ19ERVYgJiYgU3VwZXJDYWxsUmVnU3RyaWN0LnRlc3QoZnVuYykpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDM2MjAsIGNsYXNzTmFtZSwgZnVuY05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBoYXNTdXBlckNhbGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlY2xhcmVQcm9wZXJ0aWVzIChjbHMsIGNsYXNzTmFtZSwgcHJvcGVydGllcywgYmFzZUNsYXNzLCBtaXhpbnMsIGVzNikge1xyXG4gICAgY2xzLl9fcHJvcHNfXyA9IFtdO1xyXG5cclxuICAgIGlmIChiYXNlQ2xhc3MgJiYgYmFzZUNsYXNzLl9fcHJvcHNfXykge1xyXG4gICAgICAgIGNscy5fX3Byb3BzX18gPSBiYXNlQ2xhc3MuX19wcm9wc19fLnNsaWNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1peGlucykge1xyXG4gICAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgbWl4aW5zLmxlbmd0aDsgKyttKSB7XHJcbiAgICAgICAgICAgIHZhciBtaXhpbiA9IG1peGluc1ttXTtcclxuICAgICAgICAgICAgaWYgKG1peGluLl9fcHJvcHNfXykge1xyXG4gICAgICAgICAgICAgICAgY2xzLl9fcHJvcHNfXyA9IGNscy5fX3Byb3BzX18uY29uY2F0KG1peGluLl9fcHJvcHNfXy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xzLl9fcHJvcHNfXy5pbmRleE9mKHgpIDwgMDtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvcGVydGllcykge1xyXG4gICAgICAgIC8vIOmihOWkhOeQhuWxnuaAp1xyXG4gICAgICAgIHByZXByb2Nlc3MucHJlcHJvY2Vzc0F0dHJzKHByb3BlcnRpZXMsIGNsYXNzTmFtZSwgY2xzLCBlczYpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiBwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWwgPSBwcm9wZXJ0aWVzW3Byb3BOYW1lXTtcclxuICAgICAgICAgICAgaWYgKCdkZWZhdWx0JyBpbiB2YWwpIHtcclxuICAgICAgICAgICAgICAgIGRlZmluZVByb3AoY2xzLCBjbGFzc05hbWUsIHByb3BOYW1lLCB2YWwsIGVzNik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWZpbmVHZXRTZXQoY2xzLCBjbGFzc05hbWUsIHByb3BOYW1lLCB2YWwsIGVzNik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGF0dHJzID0gQXR0ci5nZXRDbGFzc0F0dHJzKGNscyk7XHJcbiAgICBjbHMuX192YWx1ZXNfXyA9IGNscy5fX3Byb3BzX18uZmlsdGVyKGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIGF0dHJzW3Byb3AgKyBERUxJTUVURVIgKyAnc2VyaWFsaXphYmxlJ10gIT09IGZhbHNlO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNjXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRGVmaW5lcyBhIENDQ2xhc3MgdXNpbmcgdGhlIGdpdmVuIHNwZWNpZmljYXRpb24sIHBsZWFzZSBzZWUgW0NsYXNzXSgvZG9jcy9lZGl0b3JzX2FuZF90b29scy9jcmVhdG9yLWNoYXB0ZXJzL3NjcmlwdGluZy9jbGFzcy5odG1sKSBmb3IgZGV0YWlscy5cclxuICogISN6aCDlrprkuYnkuIDkuKogQ0NDbGFzc++8jOS8oOWFpeWPguaVsOW/hemhu+aYr+S4gOS4quWMheWQq+exu+Wei+WPguaVsOeahOWtl+mdoumHj+Wvueixoe+8jOWFt+S9k+eUqOazleivt+afpemYhVvnsbvlnovlrprkuYldKC9kb2NzL2NyZWF0b3Ivc2NyaXB0aW5nL2NsYXNzLmh0bWwp44CCXHJcbiAqXHJcbiAqIEBtZXRob2QgQ2xhc3NcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubmFtZV0gLSBUaGUgY2xhc3MgbmFtZSB1c2VkIGZvciBzZXJpYWxpemF0aW9uLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5leHRlbmRzXSAtIFRoZSBiYXNlIGNsYXNzLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jdG9yXSAtIFRoZSBjb25zdHJ1Y3Rvci5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuX19jdG9yX19dIC0gVGhlIHNhbWUgYXMgY3RvciwgYnV0IGxlc3MgZW5jYXBzdWxhdGVkLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucHJvcGVydGllc10gLSBUaGUgcHJvcGVydHkgZGVmaW5pdGlvbnMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5zdGF0aWNzXSAtIFRoZSBzdGF0aWMgbWVtYmVycy5cclxuICogQHBhcmFtIHtGdW5jdGlvbltdfSBbb3B0aW9ucy5taXhpbnNdXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5lZGl0b3JdIC0gYXR0cmlidXRlcyBmb3IgQ29tcG9uZW50IGxpc3RlZCBiZWxvdy5cclxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5lZGl0b3IuZXhlY3V0ZUluRWRpdE1vZGU9ZmFsc2VdIC0gQWxsb3dzIHRoZSBjdXJyZW50IGNvbXBvbmVudCB0byBydW4gaW4gZWRpdCBtb2RlLiBCeSBkZWZhdWx0LCBhbGwgY29tcG9uZW50cyBhcmUgZXhlY3V0ZWQgb25seSBhdCBydW50aW1lLCBtZWFuaW5nIHRoYXQgdGhleSB3aWxsIG5vdCBoYXZlIHRoZWlyIGNhbGxiYWNrIGZ1bmN0aW9ucyBleGVjdXRlZCB3aGlsZSB0aGUgRWRpdG9yIGlzIGluIGVkaXQgbW9kZS5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZWRpdG9yLnJlcXVpcmVDb21wb25lbnRdIC0gQXV0b21hdGljYWxseSBhZGQgcmVxdWlyZWQgY29tcG9uZW50IGFzIGEgZGVwZW5kZW5jeS5cclxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmVkaXRvci5tZW51XSAtIFRoZSBtZW51IHBhdGggdG8gcmVnaXN0ZXIgYSBjb21wb25lbnQgdG8gdGhlIGVkaXRvcnMgXCJDb21wb25lbnRcIiBtZW51LiBFZy4gXCJSZW5kZXJpbmcvQ2FtZXJhXCIuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5lZGl0b3IuZXhlY3V0aW9uT3JkZXI9MF0gLSBUaGUgZXhlY3V0aW9uIG9yZGVyIG9mIGxpZmVjeWNsZSBtZXRob2RzIGZvciBDb21wb25lbnQuIFRob3NlIGxlc3MgdGhhbiAwIHdpbGwgZXhlY3V0ZSBiZWZvcmUgd2hpbGUgdGhvc2UgZ3JlYXRlciB0aGFuIDAgd2lsbCBleGVjdXRlIGFmdGVyLiBUaGUgb3JkZXIgd2lsbCBvbmx5IGFmZmVjdCBvbkxvYWQsIG9uRW5hYmxlLCBzdGFydCwgdXBkYXRlIGFuZCBsYXRlVXBkYXRlIHdoaWxlIG9uRGlzYWJsZSBhbmQgb25EZXN0cm95IHdpbGwgbm90IGJlIGFmZmVjdGVkLlxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmVkaXRvci5kaXNhbGxvd011bHRpcGxlXSAtIElmIHNwZWNpZmllZCB0byBhIHR5cGUsIHByZXZlbnRzIENvbXBvbmVudCBvZiB0aGUgc2FtZSB0eXBlIChvciBzdWJ0eXBlKSB0byBiZSBhZGRlZCBtb3JlIHRoYW4gb25jZSB0byBhIE5vZGUuXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZWRpdG9yLnBsYXlPbkZvY3VzPWZhbHNlXSAtIFRoaXMgcHJvcGVydHkgaXMgb25seSBhdmFpbGFibGUgd2hlbiBleGVjdXRlSW5FZGl0TW9kZSBpcyBzZXQuIElmIHNwZWNpZmllZCwgdGhlIGVkaXRvcidzIHNjZW5lIHZpZXcgd2lsbCBrZWVwIHVwZGF0aW5nIHRoaXMgbm9kZSBpbiA2MCBmcHMgd2hlbiBpdCBpcyBzZWxlY3RlZCwgb3RoZXJ3aXNlLCBpdCB3aWxsIHVwZGF0ZSBvbmx5IGlmIG5lY2Vzc2FyeS5cclxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmVkaXRvci5pbnNwZWN0b3JdIC0gQ3VzdG9taXplIHRoZSBwYWdlIHVybCB1c2VkIGJ5IHRoZSBjdXJyZW50IGNvbXBvbmVudCB0byByZW5kZXIgaW4gdGhlIFByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5lZGl0b3IuaWNvbl0gLSBDdXN0b21pemUgdGhlIGljb24gdGhhdCB0aGUgY3VycmVudCBjb21wb25lbnQgZGlzcGxheXMgaW4gdGhlIGVkaXRvci5cclxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmVkaXRvci5oZWxwXSAtIFRoZSBjdXN0b20gZG9jdW1lbnRhdGlvbiBVUkxcclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudXBkYXRlXSAtIGxpZmVjeWNsZSBtZXRob2QgZm9yIENvbXBvbmVudCwgc2VlIHt7I2Nyb3NzTGluayBcIkNvbXBvbmVudC91cGRhdGU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmxhdGVVcGRhdGVdIC0gbGlmZWN5Y2xlIG1ldGhvZCBmb3IgQ29tcG9uZW50LCBzZWUge3sjY3Jvc3NMaW5rIFwiQ29tcG9uZW50L2xhdGVVcGRhdGU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uTG9hZF0gLSBsaWZlY3ljbGUgbWV0aG9kIGZvciBDb21wb25lbnQsIHNlZSB7eyNjcm9zc0xpbmsgXCJDb21wb25lbnQvb25Mb2FkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5zdGFydF0gLSBsaWZlY3ljbGUgbWV0aG9kIGZvciBDb21wb25lbnQsIHNlZSB7eyNjcm9zc0xpbmsgXCJDb21wb25lbnQvc3RhcnQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRW5hYmxlXSAtIGxpZmVjeWNsZSBtZXRob2QgZm9yIENvbXBvbmVudCwgc2VlIHt7I2Nyb3NzTGluayBcIkNvbXBvbmVudC9vbkVuYWJsZTptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25EaXNhYmxlXSAtIGxpZmVjeWNsZSBtZXRob2QgZm9yIENvbXBvbmVudCwgc2VlIHt7I2Nyb3NzTGluayBcIkNvbXBvbmVudC9vbkRpc2FibGU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRGVzdHJveV0gLSBsaWZlY3ljbGUgbWV0aG9kIGZvciBDb21wb25lbnQsIHNlZSB7eyNjcm9zc0xpbmsgXCJDb21wb25lbnQvb25EZXN0cm95Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkZvY3VzSW5FZGl0b3JdIC0gbGlmZWN5Y2xlIG1ldGhvZCBmb3IgQ29tcG9uZW50LCBzZWUge3sjY3Jvc3NMaW5rIFwiQ29tcG9uZW50L29uRm9jdXNJbkVkaXRvcjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25Mb3N0Rm9jdXNJbkVkaXRvcl0gLSBsaWZlY3ljbGUgbWV0aG9kIGZvciBDb21wb25lbnQsIHNlZSB7eyNjcm9zc0xpbmsgXCJDb21wb25lbnQvb25Mb3N0Rm9jdXNJbkVkaXRvcjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucmVzZXRJbkVkaXRvcl0gLSBsaWZlY3ljbGUgbWV0aG9kIGZvciBDb21wb25lbnQsIHNlZSB7eyNjcm9zc0xpbmsgXCJDb21wb25lbnQvcmVzZXRJbkVkaXRvcjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25SZXN0b3JlXSAtIGZvciBDb21wb25lbnQgb25seSwgc2VlIHt7I2Nyb3NzTGluayBcIkNvbXBvbmVudC9vblJlc3RvcmU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLl9nZXRMb2NhbEJvdW5kc10gLSBmb3IgQ29tcG9uZW50IG9ubHksIHNlZSB7eyNjcm9zc0xpbmsgXCJDb21wb25lbnQvX2dldExvY2FsQm91bmRzOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxyXG4gKlxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gLSB0aGUgY3JlYXRlZCBjbGFzc1xyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG5cclxuIC8vIGRlZmluZSBiYXNlIGNsYXNzXHJcbiB2YXIgTm9kZSA9IGNjLkNsYXNzKCk7XHJcblxyXG4gLy8gZGVmaW5lIHN1YiBjbGFzc1xyXG4gdmFyIFNwcml0ZSA9IGNjLkNsYXNzKHtcclxuICAgICBuYW1lOiAnU3ByaXRlJyxcclxuICAgICBleHRlbmRzOiBOb2RlLFxyXG5cclxuICAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgIHRoaXMudXJsID0gXCJcIjtcclxuICAgICAgICAgdGhpcy5pZCA9IDA7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgc3RhdGljczoge1xyXG4gICAgICAgICAvLyBkZWZpbmUgc3RhdGljIG1lbWJlcnNcclxuICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgIGdldEJvdW5kczogZnVuY3Rpb24gKHNwcml0ZUxpc3QpIHtcclxuICAgICAgICAgICAgIC8vIGNvbXB1dGUgYm91bmRzLi4uXHJcbiAgICAgICAgIH1cclxuICAgICB9LFxyXG5cclxuICAgICBwcm9wZXJ0aWVzIHtcclxuICAgICAgICAgd2lkdGg6IHtcclxuICAgICAgICAgICAgIGRlZmF1bHQ6IDEyOCxcclxuICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICB0b29sdGlwOiAnVGhlIHdpZHRoIG9mIHNwcml0ZSdcclxuICAgICAgICAgfSxcclxuICAgICAgICAgaGVpZ2h0OiAxMjgsXHJcbiAgICAgICAgIHNpemU6IHtcclxuICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgIHJldHVybiBjYy52Mih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICB9LFxyXG5cclxuICAgICBsb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgIC8vIGxvYWQgdGhpcy51cmwuLi5cclxuICAgICB9O1xyXG4gfSk7XHJcblxyXG4gLy8gaW5zdGFudGlhdGVcclxuXHJcbiB2YXIgb2JqID0gbmV3IFNwcml0ZSgpO1xyXG4gb2JqLnVybCA9ICdzcHJpdGUucG5nJztcclxuIG9iai5sb2FkKCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBDQ0NsYXNzIChvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICB2YXIgbmFtZSA9IG9wdGlvbnMubmFtZTtcclxuICAgIHZhciBiYXNlID0gb3B0aW9ucy5leHRlbmRzLyogfHwgQ0NPYmplY3QqLztcclxuICAgIHZhciBtaXhpbnMgPSBvcHRpb25zLm1peGlucztcclxuXHJcbiAgICAvLyBjcmVhdGUgY29uc3RydWN0b3JcclxuICAgIHZhciBjbHMgPSBkZWZpbmUobmFtZSwgYmFzZSwgbWl4aW5zLCBvcHRpb25zKTtcclxuICAgIGlmICghbmFtZSkge1xyXG4gICAgICAgIG5hbWUgPSBjYy5qcy5nZXRDbGFzc05hbWUoY2xzKTtcclxuICAgIH1cclxuXHJcbiAgICBjbHMuX3NlYWxlZCA9IHRydWU7XHJcbiAgICBpZiAoYmFzZSkge1xyXG4gICAgICAgIGJhc2UuX3NlYWxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRlZmluZSBQcm9wZXJ0aWVzXHJcbiAgICB2YXIgcHJvcGVydGllcyA9IG9wdGlvbnMucHJvcGVydGllcztcclxuICAgIGlmICh0eXBlb2YgcHJvcGVydGllcyA9PT0gJ2Z1bmN0aW9uJyB8fFxyXG4gICAgICAgIChiYXNlICYmIGJhc2UuX19wcm9wc19fID09PSBudWxsKSB8fFxyXG4gICAgICAgIChtaXhpbnMgJiYgbWl4aW5zLnNvbWUoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHguX19wcm9wc19fID09PSBudWxsO1xyXG4gICAgICAgIH0pKVxyXG4gICAgKSB7XHJcbiAgICAgICAgaWYgKENDX0RFViAmJiBvcHRpb25zLl9fRVM2X18pIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoJ25vdCB5ZXQgaW1wbGVtZW50IGRlZmVycmVkIHByb3BlcnRpZXMgZm9yIEVTNiBDbGFzc2VzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkZWZlcnJlZEluaXRpYWxpemVyLnB1c2goe2NsczogY2xzLCBwcm9wczogcHJvcGVydGllcywgbWl4aW5zOiBtaXhpbnN9KTtcclxuICAgICAgICAgICAgY2xzLl9fcHJvcHNfXyA9IGNscy5fX3ZhbHVlc19fID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkZWNsYXJlUHJvcGVydGllcyhjbHMsIG5hbWUsIHByb3BlcnRpZXMsIGJhc2UsIG9wdGlvbnMubWl4aW5zLCBvcHRpb25zLl9fRVM2X18pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRlZmluZSBzdGF0aWNzXHJcbiAgICB2YXIgc3RhdGljcyA9IG9wdGlvbnMuc3RhdGljcztcclxuICAgIGlmIChzdGF0aWNzKSB7XHJcbiAgICAgICAgdmFyIHN0YXRpY1Byb3BOYW1lO1xyXG4gICAgICAgIGlmIChDQ19ERVYpIHtcclxuICAgICAgICAgICAgZm9yIChzdGF0aWNQcm9wTmFtZSBpbiBzdGF0aWNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSU5WQUxJRF9TVEFUSUNTX0RFVi5pbmRleE9mKHN0YXRpY1Byb3BOYW1lKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM2NDIsIG5hbWUsIHN0YXRpY1Byb3BOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNQcm9wTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChzdGF0aWNQcm9wTmFtZSBpbiBzdGF0aWNzKSB7XHJcbiAgICAgICAgICAgIGNsc1tzdGF0aWNQcm9wTmFtZV0gPSBzdGF0aWNzW3N0YXRpY1Byb3BOYW1lXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGVmaW5lIGZ1bmN0aW9uc1xyXG4gICAgZm9yICh2YXIgZnVuY05hbWUgaW4gb3B0aW9ucykge1xyXG4gICAgICAgIGlmIChCVUlMVElOX0VOVFJJRVMuaW5kZXhPZihmdW5jTmFtZSkgPj0gMCkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBvcHRpb25zW2Z1bmNOYW1lXTtcclxuICAgICAgICBpZiAoIXByZXByb2Nlc3MudmFsaWRhdGVNZXRob2RXaXRoUHJvcHMoZnVuYywgZnVuY05hbWUsIG5hbWUsIGNscywgYmFzZSkpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHVzZSB2YWx1ZSB0byByZWRlZmluZSBzb21lIHN1cGVyIG1ldGhvZCBkZWZpbmVkIGFzIGdldHRlclxyXG4gICAgICAgIGpzLnZhbHVlKGNscy5wcm90b3R5cGUsIGZ1bmNOYW1lLCBmdW5jLCB0cnVlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIGVkaXRvciA9IG9wdGlvbnMuZWRpdG9yO1xyXG4gICAgaWYgKGVkaXRvcikge1xyXG4gICAgICAgIGNjLkNvbXBvbmVudC5fcmVnaXN0ZXJFZGl0b3JQcm9wcyhjbHMsIGVkaXRvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNscztcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBjb25zdHJ1Y3RvciBpcyBjcmVhdGVkIGJ5IGNjLkNsYXNzXHJcbiAqXHJcbiAqIEBtZXRob2QgX2lzQ0NDbGFzc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuQ0NDbGFzcy5faXNDQ0NsYXNzID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yKSB7XHJcbiAgICByZXR1cm4gY29uc3RydWN0b3IgJiZcclxuICAgICAgICAgICBjb25zdHJ1Y3Rvci5oYXNPd25Qcm9wZXJ0eSgnX19jdG9yc19fJyk7ICAgICAvLyBpcyBub3QgaW5oZXJpdGVkIF9fY3RvcnNfX1xyXG59O1xyXG5cclxuLy9cclxuLy8gT3B0aW1pemVkIGRlZmluZSBmdW5jdGlvbiBvbmx5IGZvciBpbnRlcm5hbCBjbGFzc2VzXHJcbi8vXHJcbi8vIEBtZXRob2QgX2Zhc3REZWZpbmVcclxuLy8gQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxyXG4vLyBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxyXG4vLyBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXphYmxlRmllbGRzXHJcbi8vIEBwcml2YXRlXHJcbi8vXHJcbkNDQ2xhc3MuX2Zhc3REZWZpbmUgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBjb25zdHJ1Y3Rvciwgc2VyaWFsaXphYmxlRmllbGRzKSB7XHJcbiAgICBqcy5zZXRDbGFzc05hbWUoY2xhc3NOYW1lLCBjb25zdHJ1Y3Rvcik7XHJcbiAgICAvL2NvbnN0cnVjdG9yLl9fY3RvcnNfXyA9IGNvbnN0cnVjdG9yLl9fY3RvcnNfXyB8fCBudWxsO1xyXG4gICAgdmFyIHByb3BzID0gY29uc3RydWN0b3IuX19wcm9wc19fID0gY29uc3RydWN0b3IuX192YWx1ZXNfXyA9IE9iamVjdC5rZXlzKHNlcmlhbGl6YWJsZUZpZWxkcyk7XHJcbiAgICB2YXIgYXR0cnMgPSBBdHRyLmdldENsYXNzQXR0cnMoY29uc3RydWN0b3IpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1tpXTtcclxuICAgICAgICBhdHRyc1trZXkgKyBERUxJTUVURVIgKyAndmlzaWJsZSddID0gZmFsc2U7XHJcbiAgICAgICAgYXR0cnNba2V5ICsgREVMSU1FVEVSICsgJ2RlZmF1bHQnXSA9IHNlcmlhbGl6YWJsZUZpZWxkc1trZXldO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQ0NDbGFzcy5BdHRyID0gQXR0cjtcclxuQ0NDbGFzcy5hdHRyID0gQXR0ci5hdHRyO1xyXG5cclxuLypcclxuICogUmV0dXJuIGFsbCBzdXBlciBjbGFzc2VzXHJcbiAqIEBtZXRob2QgZ2V0SW5oZXJpdGFuY2VDaGFpblxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbltdfVxyXG4gKi9cclxuQ0NDbGFzcy5nZXRJbmhlcml0YW5jZUNoYWluID0gZnVuY3Rpb24gKGtsYXNzKSB7XHJcbiAgICB2YXIgY2hhaW4gPSBbXTtcclxuICAgIGZvciAoOzspIHtcclxuICAgICAgICBrbGFzcyA9IGpzLmdldFN1cGVyKGtsYXNzKTtcclxuICAgICAgICBpZiAoIWtsYXNzKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoa2xhc3MgIT09IE9iamVjdCkge1xyXG4gICAgICAgICAgICBjaGFpbi5wdXNoKGtsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hhaW47XHJcbn07XHJcblxyXG52YXIgUHJpbWl0aXZlVHlwZXMgPSB7XHJcbiAgICAvLyBTcGVjaWZ5IHRoYXQgdGhlIGlucHV0IHZhbHVlIG11c3QgYmUgaW50ZWdlciBpbiBQcm9wZXJ0aWVzLlxyXG4gICAgLy8gQWxzbyB1c2VkIHRvIGluZGljYXRlcyB0aGF0IHRoZSB0eXBlIG9mIGVsZW1lbnRzIGluIGFycmF5IG9yIHRoZSB0eXBlIG9mIHZhbHVlIGluIGRpY3Rpb25hcnkgaXMgaW50ZWdlci5cclxuICAgIEludGVnZXI6ICdOdW1iZXInLFxyXG4gICAgLy8gSW5kaWNhdGVzIHRoYXQgdGhlIHR5cGUgb2YgZWxlbWVudHMgaW4gYXJyYXkgb3IgdGhlIHR5cGUgb2YgdmFsdWUgaW4gZGljdGlvbmFyeSBpcyBkb3VibGUuXHJcbiAgICBGbG9hdDogJ051bWJlcicsXHJcbiAgICBCb29sZWFuOiAnQm9vbGVhbicsXHJcbiAgICBTdHJpbmc6ICdTdHJpbmcnLFxyXG59O1xyXG52YXIgb25BZnRlclByb3BzX0VUID0gW107XHJcbmZ1bmN0aW9uIHBhcnNlQXR0cmlidXRlcyAoY2xzLCBhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHByb3BOYW1lLCB1c2VkSW5HZXR0ZXIpIHtcclxuICAgIHZhciBFUlJfVHlwZSA9IENDX0RFViA/ICdUaGUgJXMgb2YgJXMgbXVzdCBiZSB0eXBlICVzJyA6ICcnO1xyXG5cclxuICAgIHZhciBhdHRycyA9IG51bGw7XHJcbiAgICB2YXIgcHJvcE5hbWVQcmVmaXggPSAnJztcclxuICAgIGZ1bmN0aW9uIGluaXRBdHRycyAoKSB7XHJcbiAgICAgICAgcHJvcE5hbWVQcmVmaXggPSBwcm9wTmFtZSArIERFTElNRVRFUjtcclxuICAgICAgICByZXR1cm4gYXR0cnMgPSBBdHRyLmdldENsYXNzQXR0cnMoY2xzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKENDX0VESVRPUiAmJiAhRWRpdG9yLmlzQnVpbGRlcikgfHwgQ0NfVEVTVCkge1xyXG4gICAgICAgIG9uQWZ0ZXJQcm9wc19FVC5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0eXBlID0gYXR0cmlidXRlcy50eXBlO1xyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgICB2YXIgcHJpbWl0aXZlVHlwZSA9IFByaW1pdGl2ZVR5cGVzW3R5cGVdO1xyXG4gICAgICAgIGlmIChwcmltaXRpdmVUeXBlKSB7XHJcbiAgICAgICAgICAgIChhdHRycyB8fCBpbml0QXR0cnMoKSlbcHJvcE5hbWVQcmVmaXggKyAndHlwZSddID0gdHlwZTtcclxuICAgICAgICAgICAgaWYgKCgoQ0NfRURJVE9SICYmICFFZGl0b3IuaXNCdWlsZGVyKSB8fCBDQ19URVNUKSAmJiAhYXR0cmlidXRlcy5fc2hvcnQpIHtcclxuICAgICAgICAgICAgICAgIG9uQWZ0ZXJQcm9wc19FVC5wdXNoKEF0dHIuZ2V0VHlwZUNoZWNrZXJfRVQocHJpbWl0aXZlVHlwZSwgJ2NjLicgKyB0eXBlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ09iamVjdCcpIHtcclxuICAgICAgICAgICAgaWYgKENDX0RFVikge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgzNjQ0LCBjbGFzc05hbWUsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IEF0dHIuU2NyaXB0VXVpZCkge1xyXG4gICAgICAgICAgICAgICAgKGF0dHJzIHx8IGluaXRBdHRycygpKVtwcm9wTmFtZVByZWZpeCArICd0eXBlJ10gPSAnU2NyaXB0JztcclxuICAgICAgICAgICAgICAgIGF0dHJzW3Byb3BOYW1lUHJlZml4ICsgJ2N0b3InXSA9IGNjLlNjcmlwdEFzc2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChFbnVtLmlzRW51bSh0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoYXR0cnMgfHwgaW5pdEF0dHJzKCkpW3Byb3BOYW1lUHJlZml4ICsgJ3R5cGUnXSA9ICdFbnVtJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnNbcHJvcE5hbWVQcmVmaXggKyAnZW51bUxpc3QnXSA9IEVudW0uZ2V0TGlzdCh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzY0NSwgY2xhc3NOYW1lLCBwcm9wTmFtZSwgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAoYXR0cnMgfHwgaW5pdEF0dHJzKCkpW3Byb3BOYW1lUHJlZml4ICsgJ3R5cGUnXSA9ICdPYmplY3QnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzW3Byb3BOYW1lUHJlZml4ICsgJ2N0b3InXSA9IHR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCgoQ0NfRURJVE9SICYmICFFZGl0b3IuaXNCdWlsZGVyKSB8fCBDQ19URVNUKSAmJiAhYXR0cmlidXRlcy5fc2hvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlclByb3BzX0VULnB1c2goQXR0ci5nZXRPYmpUeXBlQ2hlY2tlcl9FVCh0eXBlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgzNjQ2LCBjbGFzc05hbWUsIHByb3BOYW1lLCB0eXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZVNpbXBsZUF0dHIgKGF0dHJOYW1lLCBleHBlY3RUeXBlKSB7XHJcbiAgICAgICAgaWYgKGF0dHJOYW1lIGluIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgdmFyIHZhbCA9IGF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gZXhwZWN0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgKGF0dHJzIHx8IGluaXRBdHRycygpKVtwcm9wTmFtZVByZWZpeCArIGF0dHJOYW1lXSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChDQ19ERVYpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKEVSUl9UeXBlLCBhdHRyTmFtZSwgY2xhc3NOYW1lLCBwcm9wTmFtZSwgZXhwZWN0VHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGF0dHJpYnV0ZXMuZWRpdG9yT25seSkge1xyXG4gICAgICAgIGlmIChDQ19ERVYgJiYgdXNlZEluR2V0dGVyKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzYxMywgXCJlZGl0b3JPbmx5XCIsIG5hbWUsIHByb3BOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIChhdHRycyB8fCBpbml0QXR0cnMoKSlbcHJvcE5hbWVQcmVmaXggKyAnZWRpdG9yT25seSddID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL3BhcnNlU2ltcGxlQXR0cigncHJldmVudERlZmVycmVkTG9hZCcsICdib29sZWFuJyk7XHJcbiAgICBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgcGFyc2VTaW1wbGVBdHRyKCdkaXNwbGF5TmFtZScsICdzdHJpbmcnKTtcclxuICAgICAgICBwYXJzZVNpbXBsZUF0dHIoJ211bHRpbGluZScsICdib29sZWFuJyk7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMucmVhZG9ubHkpIHtcclxuICAgICAgICAgICAgKGF0dHJzIHx8IGluaXRBdHRycygpKVtwcm9wTmFtZVByZWZpeCArICdyZWFkb25seSddID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFyc2VTaW1wbGVBdHRyKCd0b29sdGlwJywgJ3N0cmluZycpO1xyXG4gICAgICAgIHBhcnNlU2ltcGxlQXR0cignc2xpZGUnLCAnYm9vbGVhbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhdHRyaWJ1dGVzLnNlcmlhbGl6YWJsZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoQ0NfREVWICYmIHVzZWRJbkdldHRlcikge1xyXG4gICAgICAgICAgICBjYy5lcnJvcklEKDM2MTMsIFwic2VyaWFsaXphYmxlXCIsIG5hbWUsIHByb3BOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIChhdHRycyB8fCBpbml0QXR0cnMoKSlbcHJvcE5hbWVQcmVmaXggKyAnc2VyaWFsaXphYmxlJ10gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIGlmIChDQ19CVUlMRCB8fCBDQ19URVNUKSB7XHJcbiAgICAvLyAgICAgbGV0IGZzYSA9IGF0dHJpYnV0ZXMuZm9ybWVybHlTZXJpYWxpemVkQXM7XHJcbiAgICAvLyAgICAgaWYgKGZzYSkge1xyXG4gICAgLy8gICAgICAgICAvLyBqcy5zZXQoY2xzLnByb3RvdHlwZSwgZnNhLCBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAvLyAgICAgICAgIC8vICAgICB0aGlzW3Byb3BOYW1lXSA9IHZhbDtcclxuICAgIC8vICAgICAgICAgLy8gfSk7XHJcbiAgICAvLyAgICAgICAgIChhdHRycyB8fCBpbml0QXR0cnMoKSlbcHJvcE5hbWVQcmVmaXggKyAnZm9ybWVybHlTZXJpYWxpemVkQXMnXSA9IGZzYTtcclxuICAgIC8vICAgICAgICAgLy8gdXNlZCBieSBkZXNlcmlhbGl6ZS1jb21waWxlZFxyXG4gICAgLy8gICAgICAgICBhdHRyc1tmc2EgKyBERUxJTUVURVIgKyAnZGVzZXJpYWxpemVBcyddID0gcHJvcE5hbWU7XHJcbiAgICAvLyAgICAgICAgIGNscy5fX0ZTQV9fID0gdHJ1ZTsgICAgIC8vIGluaGVyaXRhYmxlXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgLy8gZWxzZSB7XHJcbiAgICAvLyAgICAgcGFyc2VTaW1wbGVBdHRyKCdmb3JtZXJseVNlcmlhbGl6ZWRBcycsICdzdHJpbmcnKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBwYXJzZVNpbXBsZUF0dHIoJ2Zvcm1lcmx5U2VyaWFsaXplZEFzJywgJ3N0cmluZycpO1xyXG5cclxuICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICBwYXJzZVNpbXBsZUF0dHIoJ25vdGlmeUZvcicsICdzdHJpbmcnKTtcclxuXHJcbiAgICAgICAgaWYgKCdhbmltYXRhYmxlJyBpbiBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIChhdHRycyB8fCBpbml0QXR0cnMoKSlbcHJvcE5hbWVQcmVmaXggKyAnYW5pbWF0YWJsZSddID0gISFhdHRyaWJ1dGVzLmFuaW1hdGFibGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChDQ19ERVYpIHtcclxuICAgICAgICB2YXIgdmlzaWJsZSA9IGF0dHJpYnV0ZXMudmlzaWJsZTtcclxuICAgICAgICBpZiAodHlwZW9mIHZpc2libGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmICghdmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgKGF0dHJzIHx8IGluaXRBdHRycygpKVtwcm9wTmFtZVByZWZpeCArICd2aXNpYmxlJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmlzaWJsZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgKGF0dHJzIHx8IGluaXRBdHRycygpKVtwcm9wTmFtZVByZWZpeCArICd2aXNpYmxlJ10gPSB2aXNpYmxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRzV2l0aFVTID0gKHByb3BOYW1lLmNoYXJDb2RlQXQoMCkgPT09IDk1KTtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0c1dpdGhVUykge1xyXG4gICAgICAgICAgICAgICAgKGF0dHJzIHx8IGluaXRBdHRycygpKVtwcm9wTmFtZVByZWZpeCArICd2aXNpYmxlJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgcmFuZ2UgPSBhdHRyaWJ1dGVzLnJhbmdlO1xyXG4gICAgaWYgKHJhbmdlKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmFuZ2UpKSB7XHJcbiAgICAgICAgICAgIGlmIChyYW5nZS5sZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICAgICAgKGF0dHJzIHx8IGluaXRBdHRycygpKVtwcm9wTmFtZVByZWZpeCArICdtaW4nXSA9IHJhbmdlWzBdO1xyXG4gICAgICAgICAgICAgICAgYXR0cnNbcHJvcE5hbWVQcmVmaXggKyAnbWF4J10gPSByYW5nZVsxXTtcclxuICAgICAgICAgICAgICAgIGlmIChyYW5nZS5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cnNbcHJvcE5hbWVQcmVmaXggKyAnc3RlcCddID0gcmFuZ2VbMl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM2NDcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKENDX0RFVikge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihFUlJfVHlwZSwgJ3JhbmdlJywgY2xhc3NOYW1lLCBwcm9wTmFtZSwgJ2FycmF5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcGFyc2VTaW1wbGVBdHRyKCdtaW4nLCAnbnVtYmVyJyk7XHJcbiAgICBwYXJzZVNpbXBsZUF0dHIoJ21heCcsICdudW1iZXInKTtcclxuICAgIHBhcnNlU2ltcGxlQXR0cignc3RlcCcsICdudW1iZXInKTtcclxuICAgIHBhcnNlU2ltcGxlQXR0cigndXNlckRhdGEnLCAnb2JqZWN0Jyk7XHJcbn1cclxuXHJcbmNjLkNsYXNzID0gQ0NDbGFzcztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaXNBcnJheTogZnVuY3Rpb24gKGRlZmF1bHRWYWwpIHtcclxuICAgICAgICBkZWZhdWx0VmFsID0gZ2V0RGVmYXVsdChkZWZhdWx0VmFsKTtcclxuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShkZWZhdWx0VmFsKTtcclxuICAgIH0sXHJcbiAgICBmYXN0RGVmaW5lOiBDQ0NsYXNzLl9mYXN0RGVmaW5lLFxyXG4gICAgZ2V0TmV3VmFsdWVUeXBlQ29kZTogQ0NfU1VQUE9SVF9KSVQgJiYgZ2V0TmV3VmFsdWVUeXBlQ29kZUppdCxcclxuICAgIElERU5USUZJRVJfUkUsXHJcbiAgICBlc2NhcGVGb3JKUyxcclxuICAgIGdldERlZmF1bHQsXHJcbn07XHJcblxyXG5pZiAoQ0NfVEVTVCkge1xyXG4gICAganMubWl4aW4oQ0NDbGFzcywgbW9kdWxlLmV4cG9ydHMpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9