
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/attribute.js';
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

var isPlainEmptyObj = require('./utils').isPlainEmptyObj_DEV;

var DELIMETER = '$_$';

function createAttrsSingle(owner, superAttrs) {
  var attrs = superAttrs ? Object.create(superAttrs) : {};
  js.value(owner, '__attrs__', attrs);
  return attrs;
} // subclass should not have __attrs__


function createAttrs(subclass) {
  if (typeof subclass !== 'function') {
    // attributes only in instance
    var instance = subclass;
    return createAttrsSingle(instance, getClassAttrs(instance.constructor));
  }

  var superClass;
  var chains = cc.Class.getInheritanceChain(subclass);

  for (var i = chains.length - 1; i >= 0; i--) {
    var cls = chains[i];

    var attrs = cls.hasOwnProperty('__attrs__') && cls.__attrs__;

    if (!attrs) {
      superClass = chains[i + 1];
      createAttrsSingle(cls, superClass && superClass.__attrs__);
    }
  }

  superClass = chains[0];
  createAttrsSingle(subclass, superClass && superClass.__attrs__);
  return subclass.__attrs__;
} // /**
//  * @class Class
//  */
//  *
//  * Tag the class with any meta attributes, then return all current attributes assigned to it.
//  * This function holds only the attributes, not their implementations.
//  *
//  * @method attr
//  * @param {Function|Object} ctor - the class or instance. If instance, the attribute will be dynamic and only available for the specified instance.
//  * @param {String} propName - the name of property or function, used to retrieve the attributes
//  * @param {Object} [newAttrs] - the attribute table to mark, new attributes will merged with existed attributes. Attribute whose key starts with '_' will be ignored.
//  * @static
//  * @private


function attr(ctor, propName, newAttrs) {
  var attrs = getClassAttrs(ctor);

  if (!CC_DEV || typeof newAttrs === 'undefined') {
    // get
    var prefix = propName + DELIMETER;
    var ret = {};

    for (var key in attrs) {
      if (key.startsWith(prefix)) {
        ret[key.slice(prefix.length)] = attrs[key];
      }
    }

    return ret;
  } else if (CC_DEV && typeof newAttrs === 'object') {
    // set
    cc.warn("`cc.Class.attr(obj, prop, { key: value });` is deprecated, use `cc.Class.Attr.setClassAttr(obj, prop, 'key', value);` instead please.");

    for (var _key in newAttrs) {
      attrs[propName + DELIMETER + _key] = newAttrs[_key];
    }
  }
} // returns a readonly meta object


function getClassAttrs(ctor) {
  return ctor.hasOwnProperty('__attrs__') && ctor.__attrs__ || createAttrs(ctor);
}

function setClassAttr(ctor, propName, key, value) {
  getClassAttrs(ctor)[propName + DELIMETER + key] = value;
}
/**
 * @module cc
 */


function PrimitiveType(name, def) {
  this.name = name;
  this["default"] = def;
}

PrimitiveType.prototype.toString = function () {
  return this.name;
};
/**
 * Specify that the input value must be integer in Inspector.
 * Also used to indicates that the elements in array should be type integer.
 * @property {string} Integer
 * @readonly
 * @example
 * // in cc.Class
 * member: {
 *     default: [],
 *     type: cc.Integer
 * }
 * // ES6 ccclass
 * @cc._decorator.property({
 *     type: cc.Integer
 * })
 * member = [];
 */


cc.Integer = new PrimitiveType('Integer', 0);
/**
 * Indicates that the elements in array should be type double.
 * @property {string} Float
 * @readonly
 * @example
 * // in cc.Class
 * member: {
 *     default: [],
 *     type: cc.Float
 * }
 * // ES6 ccclass
 * @cc._decorator.property({
 *     type: cc.Float
 * })
 * member = [];
 */

cc.Float = new PrimitiveType('Float', 0);

if (CC_EDITOR) {
  js.get(cc, 'Number', function () {
    cc.warnID(3603);
    return cc.Float;
  });
}
/**
 * Indicates that the elements in array should be type boolean.
 * @property {string} Boolean
 * @readonly
 * @example
 * // in cc.Class
 * member: {
 *     default: [],
 *     type: cc.Boolean
 * }
 * // ES6 ccclass
 * @cc._decorator.property({
 *     type: cc.Boolean
 * })
 * member = [];
 */


cc.Boolean = new PrimitiveType('Boolean', false);
/**
 * Indicates that the elements in array should be type string.
 * @property {string} String
 * @readonly
 * @example
 * // in cc.Class
 * member: {
 *     default: [],
 *     type: cc.String
 * }
 * // ES6 ccclass
 * @cc._decorator.property({
 *     type: cc.String
 * })
 * member = [];
 */

cc.String = new PrimitiveType('String', ''); // Ensures the type matches its default value

function getTypeChecker(type, attrName) {
  return function (constructor, mainPropName) {
    var propInfo = '"' + js.getClassName(constructor) + '.' + mainPropName + '"';
    var mainPropAttrs = attr(constructor, mainPropName);
    var mainPropAttrsType = mainPropAttrs.type;

    if (mainPropAttrsType === cc.Integer || mainPropAttrsType === cc.Float) {
      mainPropAttrsType = 'Number';
    } else if (mainPropAttrsType === cc.String || mainPropAttrsType === cc.Boolean) {
      mainPropAttrsType = '' + mainPropAttrsType;
    }

    if (mainPropAttrsType !== type) {
      cc.warnID(3604, propInfo);
      return;
    }

    if (!mainPropAttrs.hasOwnProperty('default')) {
      return;
    }

    var defaultVal = mainPropAttrs["default"];

    if (typeof defaultVal === 'undefined') {
      return;
    }

    var isContainer = Array.isArray(defaultVal) || isPlainEmptyObj(defaultVal);

    if (isContainer) {
      return;
    }

    var defaultType = typeof defaultVal;
    var type_lowerCase = type.toLowerCase();

    if (defaultType === type_lowerCase) {
      if (type_lowerCase === 'object') {
        if (defaultVal && !(defaultVal instanceof mainPropAttrs.ctor)) {
          cc.warnID(3605, propInfo, js.getClassName(mainPropAttrs.ctor));
        } else {
          return;
        }
      } else if (type !== 'Number') {
        cc.warnID(3606, attrName, propInfo, type);
      }
    } else if (defaultType !== 'function') {
      if (type === cc.String && defaultVal == null) {
        cc.warnID(3607, propInfo);
      } else {
        cc.warnID(3611, attrName, propInfo, defaultType);
      }
    } else {
      return;
    }

    delete mainPropAttrs.type;
  };
} // Ensures the type matches its default value


function getObjTypeChecker(typeCtor) {
  return function (classCtor, mainPropName) {
    getTypeChecker('Object', 'type')(classCtor, mainPropName); // check ValueType

    var defaultDef = getClassAttrs(classCtor)[mainPropName + DELIMETER + 'default'];

    var defaultVal = require('./CCClass').getDefault(defaultDef);

    if (!Array.isArray(defaultVal) && js.isChildClassOf(typeCtor, cc.ValueType)) {
      var typename = js.getClassName(typeCtor);
      var info = cc.js.formatStr('No need to specify the "type" of "%s.%s" because %s is a child class of ValueType.', js.getClassName(classCtor), mainPropName, typename);

      if (defaultDef) {
        cc.log(info);
      } else {
        cc.warnID(3612, info, typename, js.getClassName(classCtor), mainPropName, typename);
      }
    }
  };
}

module.exports = {
  PrimitiveType: PrimitiveType,
  attr: attr,
  getClassAttrs: getClassAttrs,
  setClassAttr: setClassAttr,
  DELIMETER: DELIMETER,
  getTypeChecker_ET: (CC_EDITOR && !Editor.isBuilder || CC_TEST) && getTypeChecker,
  getObjTypeChecker_ET: (CC_EDITOR && !Editor.isBuilder || CC_TEST) && getObjTypeChecker,
  ScriptUuid: {} // the value will be represented as a uuid string

};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxhdHRyaWJ1dGUuanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwiaXNQbGFpbkVtcHR5T2JqIiwiaXNQbGFpbkVtcHR5T2JqX0RFViIsIkRFTElNRVRFUiIsImNyZWF0ZUF0dHJzU2luZ2xlIiwib3duZXIiLCJzdXBlckF0dHJzIiwiYXR0cnMiLCJPYmplY3QiLCJjcmVhdGUiLCJ2YWx1ZSIsImNyZWF0ZUF0dHJzIiwic3ViY2xhc3MiLCJpbnN0YW5jZSIsImdldENsYXNzQXR0cnMiLCJjb25zdHJ1Y3RvciIsInN1cGVyQ2xhc3MiLCJjaGFpbnMiLCJjYyIsIkNsYXNzIiwiZ2V0SW5oZXJpdGFuY2VDaGFpbiIsImkiLCJsZW5ndGgiLCJjbHMiLCJoYXNPd25Qcm9wZXJ0eSIsIl9fYXR0cnNfXyIsImF0dHIiLCJjdG9yIiwicHJvcE5hbWUiLCJuZXdBdHRycyIsIkNDX0RFViIsInByZWZpeCIsInJldCIsImtleSIsInN0YXJ0c1dpdGgiLCJzbGljZSIsIndhcm4iLCJzZXRDbGFzc0F0dHIiLCJQcmltaXRpdmVUeXBlIiwibmFtZSIsImRlZiIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiSW50ZWdlciIsIkZsb2F0IiwiQ0NfRURJVE9SIiwiZ2V0Iiwid2FybklEIiwiQm9vbGVhbiIsIlN0cmluZyIsImdldFR5cGVDaGVja2VyIiwidHlwZSIsImF0dHJOYW1lIiwibWFpblByb3BOYW1lIiwicHJvcEluZm8iLCJnZXRDbGFzc05hbWUiLCJtYWluUHJvcEF0dHJzIiwibWFpblByb3BBdHRyc1R5cGUiLCJkZWZhdWx0VmFsIiwiaXNDb250YWluZXIiLCJBcnJheSIsImlzQXJyYXkiLCJkZWZhdWx0VHlwZSIsInR5cGVfbG93ZXJDYXNlIiwidG9Mb3dlckNhc2UiLCJnZXRPYmpUeXBlQ2hlY2tlciIsInR5cGVDdG9yIiwiY2xhc3NDdG9yIiwiZGVmYXVsdERlZiIsImdldERlZmF1bHQiLCJpc0NoaWxkQ2xhc3NPZiIsIlZhbHVlVHlwZSIsInR5cGVuYW1lIiwiaW5mbyIsImZvcm1hdFN0ciIsImxvZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXRUeXBlQ2hlY2tlcl9FVCIsIkVkaXRvciIsImlzQnVpbGRlciIsIkNDX1RFU1QiLCJnZXRPYmpUeXBlQ2hlY2tlcl9FVCIsIlNjcmlwdFV1aWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLEVBQUUsR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBaEI7O0FBQ0EsSUFBSUMsZUFBZSxHQUFHRCxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1CRSxtQkFBekM7O0FBRUEsSUFBTUMsU0FBUyxHQUFHLEtBQWxCOztBQUVBLFNBQVNDLGlCQUFULENBQTRCQyxLQUE1QixFQUFtQ0MsVUFBbkMsRUFBK0M7QUFDM0MsTUFBSUMsS0FBSyxHQUFHRCxVQUFVLEdBQUdFLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjSCxVQUFkLENBQUgsR0FBK0IsRUFBckQ7QUFDQVAsRUFBQUEsRUFBRSxDQUFDVyxLQUFILENBQVNMLEtBQVQsRUFBZ0IsV0FBaEIsRUFBNkJFLEtBQTdCO0FBQ0EsU0FBT0EsS0FBUDtBQUNILEVBRUQ7OztBQUNBLFNBQVNJLFdBQVQsQ0FBc0JDLFFBQXRCLEVBQWdDO0FBQzVCLE1BQUksT0FBT0EsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUNoQztBQUNBLFFBQUlDLFFBQVEsR0FBR0QsUUFBZjtBQUNBLFdBQU9SLGlCQUFpQixDQUFDUyxRQUFELEVBQVdDLGFBQWEsQ0FBQ0QsUUFBUSxDQUFDRSxXQUFWLENBQXhCLENBQXhCO0FBQ0g7O0FBQ0QsTUFBSUMsVUFBSjtBQUNBLE1BQUlDLE1BQU0sR0FBR0MsRUFBRSxDQUFD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WUFKRDtBQUtibEMsRUFBQUEsU0FBUyxFQUFFQSxTQUxFO0FBTWIyRSxFQUFBQSxpQkFBaUIsRUFBRSxDQUFFakMsU0FBUyxJQUFJLENBQUNrQyxNQUFNLENBQUNDLFNBQXRCLElBQW9DQyxPQUFyQyxLQUFpRC9CLGNBTnZEO0FBT2JnQyxFQUFBQSxvQkFBb0IsRUFBRSxDQUFFckMsU0FBUyxJQUFJLENBQUNrQyxNQUFNLENBQUNDLFNBQXRCLElBQW9DQyxPQUFyQyxLQUFpRGhCLGlCQVAxRDtBQVFia0IsRUFBQUEsVUFBVSxFQUFFLEVBUkMsQ0FRUTs7QUFSUixDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnZhciBqcyA9IHJlcXVpcmUoJy4vanMnKTtcclxudmFyIGlzUGxhaW5FbXB0eU9iaiA9IHJlcXVpcmUoJy4vdXRpbHMnKS5pc1BsYWluRW1wdHlPYmpfREVWO1xyXG5cclxuY29uc3QgREVMSU1FVEVSID0gJyRfJCc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVBdHRyc1NpbmdsZSAob3duZXIsIHN1cGVyQXR0cnMpIHtcclxuICAgIHZhciBhdHRycyA9IHN1cGVyQXR0cnMgPyBPYmplY3QuY3JlYXRlKHN1cGVyQXR0cnMpIDoge307XHJcbiAgICBqcy52YWx1ZShvd25lciwgJ19fYXR0cnNfXycsIGF0dHJzKTtcclxuICAgIHJldHVybiBhdHRycztcclxufVxyXG5cclxuLy8gc3ViY2xhc3Mgc2hvdWxkIG5vdCBoYXZlIF9fYXR0cnNfX1xyXG5mdW5jdGlvbiBjcmVhdGVBdHRycyAoc3ViY2xhc3MpIHtcclxuICAgIGlmICh0eXBlb2Ygc3ViY2xhc3MgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBhdHRyaWJ1dGVzIG9ubHkgaW4gaW5zdGFuY2VcclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSBzdWJjbGFzcztcclxuICAgICAgICByZXR1cm4gY3JlYXRlQXR0cnNTaW5nbGUoaW5zdGFuY2UsIGdldENsYXNzQXR0cnMoaW5zdGFuY2UuY29uc3RydWN0b3IpKTtcclxuICAgIH1cclxuICAgIHZhciBzdXBlckNsYXNzO1xyXG4gICAgdmFyIGNoYWlucyA9IGNjLkNsYXNzLmdldEluaGVyaXRhbmNlQ2hhaW4oc3ViY2xhc3MpO1xyXG4gICAgZm9yICh2YXIgaSA9IGNoYWlucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciBjbHMgPSBjaGFpbnNbaV07XHJcbiAgICAgICAgdmFyIGF0dHJzID0gY2xzLmhhc093blByb3BlcnR5KCdfX2F0dHJzX18nKSAmJiBjbHMuX19hdHRyc19fO1xyXG4gICAgICAgIGlmICghYXR0cnMpIHtcclxuICAgICAgICAgICAgc3VwZXJDbGFzcyA9IGNoYWluc1tpICsgMV07XHJcbiAgICAgICAgICAgIGNyZWF0ZUF0dHJzU2luZ2xlKGNscywgc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLl9fYXR0cnNfXyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3VwZXJDbGFzcyA9IGNoYWluc1swXTtcclxuICAgIGNyZWF0ZUF0dHJzU2luZ2xlKHN1YmNsYXNzLCBzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MuX19hdHRyc19fKTtcclxuICAgIHJldHVybiBzdWJjbGFzcy5fX2F0dHJzX187XHJcbn1cclxuXHJcbi8vIC8qKlxyXG4vLyAgKiBAY2xhc3MgQ2xhc3NcclxuLy8gICovXHJcblxyXG4vLyAgKlxyXG4vLyAgKiBUYWcgdGhlIGNsYXNzIHdpdGggYW55IG1ldGEgYXR0cmlidXRlcywgdGhlbiByZXR1cm4gYWxsIGN1cnJlbnQgYXR0cmlidXRlcyBhc3NpZ25lZCB0byBpdC5cclxuLy8gICogVGhpcyBmdW5jdGlvbiBob2xkcyBvbmx5IHRoZSBhdHRyaWJ1dGVzLCBub3QgdGhlaXIgaW1wbGVtZW50YXRpb25zLlxyXG4vLyAgKlxyXG4vLyAgKiBAbWV0aG9kIGF0dHJcclxuLy8gICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9IGN0b3IgLSB0aGUgY2xhc3Mgb3IgaW5zdGFuY2UuIElmIGluc3RhbmNlLCB0aGUgYXR0cmlidXRlIHdpbGwgYmUgZHluYW1pYyBhbmQgb25seSBhdmFpbGFibGUgZm9yIHRoZSBzcGVjaWZpZWQgaW5zdGFuY2UuXHJcbi8vICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wTmFtZSAtIHRoZSBuYW1lIG9mIHByb3BlcnR5IG9yIGZ1bmN0aW9uLCB1c2VkIHRvIHJldHJpZXZlIHRoZSBhdHRyaWJ1dGVzXHJcbi8vICAqIEBwYXJhbSB7T2JqZWN0fSBbbmV3QXR0cnNdIC0gdGhlIGF0dHJpYnV0ZSB0YWJsZSB0byBtYXJrLCBuZXcgYXR0cmlidXRlcyB3aWxsIG1lcmdlZCB3aXRoIGV4aXN0ZWQgYXR0cmlidXRlcy4gQXR0cmlidXRlIHdob3NlIGtleSBzdGFydHMgd2l0aCAnXycgd2lsbCBiZSBpZ25vcmVkLlxyXG4vLyAgKiBAc3RhdGljXHJcbi8vICAqIEBwcml2YXRlXHJcbmZ1bmN0aW9uIGF0dHIgKGN0b3IsIHByb3BOYW1lLCBuZXdBdHRycykge1xyXG4gICAgdmFyIGF0dHJzID0gZ2V0Q2xhc3NBdHRycyhjdG9yKTtcclxuICAgIGlmICghQ0NfREVWIHx8IHR5cGVvZiBuZXdBdHRycyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvLyBnZXRcclxuICAgICAgICB2YXIgcHJlZml4ID0gcHJvcE5hbWUgKyBERUxJTUVURVI7XHJcbiAgICAgICAgdmFyIHJldCA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhdHRycykge1xyXG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgocHJlZml4KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0W2tleS5zbGljZShwcmVmaXgubGVuZ3RoKV0gPSBhdHRyc1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChDQ19ERVYgJiYgdHlwZW9mIG5ld0F0dHJzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIC8vIHNldFxyXG4gICAgICAgIGNjLndhcm4oYFxcYGNjLkNsYXNzLmF0dHIob2JqLCBwcm9wLCB7IGtleTogdmFsdWUgfSk7XFxgIGlzIGRlcHJlY2F0ZWQsIHVzZSBcXGBjYy5DbGFzcy5BdHRyLnNldENsYXNzQXR0cihvYmosIHByb3AsICdrZXknLCB2YWx1ZSk7XFxgIGluc3RlYWQgcGxlYXNlLmApO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuZXdBdHRycykge1xyXG4gICAgICAgICAgICBhdHRyc1twcm9wTmFtZSArIERFTElNRVRFUiArIGtleV0gPSBuZXdBdHRyc1trZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gcmV0dXJucyBhIHJlYWRvbmx5IG1ldGEgb2JqZWN0XHJcbmZ1bmN0aW9uIGdldENsYXNzQXR0cnMgKGN0b3IpIHtcclxuICAgIHJldHVybiAoY3Rvci5oYXNPd25Qcm9wZXJ0eSgnX19hdHRyc19fJykgJiYgY3Rvci5fX2F0dHJzX18pIHx8IGNyZWF0ZUF0dHJzKGN0b3IpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDbGFzc0F0dHIgKGN0b3IsIHByb3BOYW1lLCBrZXksIHZhbHVlKSB7XHJcbiAgICBnZXRDbGFzc0F0dHJzKGN0b3IpW3Byb3BOYW1lICsgREVMSU1FVEVSICsga2V5XSA9IHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIFByaW1pdGl2ZVR5cGUgKG5hbWUsIGRlZikge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuZGVmYXVsdCA9IGRlZjtcclxufVxyXG5QcmltaXRpdmVUeXBlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbn07XHJcblxyXG4vKipcclxuICogU3BlY2lmeSB0aGF0IHRoZSBpbnB1dCB2YWx1ZSBtdXN0IGJlIGludGVnZXIgaW4gSW5zcGVjdG9yLlxyXG4gKiBBbHNvIHVzZWQgdG8gaW5kaWNhdGVzIHRoYXQgdGhlIGVsZW1lbnRzIGluIGFycmF5IHNob3VsZCBiZSB0eXBlIGludGVnZXIuXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBJbnRlZ2VyXHJcbiAqIEByZWFkb25seVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBpbiBjYy5DbGFzc1xyXG4gKiBtZW1iZXI6IHtcclxuICogICAgIGRlZmF1bHQ6IFtdLFxyXG4gKiAgICAgdHlwZTogY2MuSW50ZWdlclxyXG4gKiB9XHJcbiAqIC8vIEVTNiBjY2NsYXNzXHJcbiAqIEBjYy5fZGVjb3JhdG9yLnByb3BlcnR5KHtcclxuICogICAgIHR5cGU6IGNjLkludGVnZXJcclxuICogfSlcclxuICogbWVtYmVyID0gW107XHJcbiAqL1xyXG5jYy5JbnRlZ2VyID0gbmV3IFByaW1pdGl2ZVR5cGUoJ0ludGVnZXInLCAwKTtcclxuXHJcbi8qKlxyXG4gKiBJbmRpY2F0ZXMgdGhhdCB0aGUgZWxlbWVudHMgaW4gYXJyYXkgc2hvdWxkIGJlIHR5cGUgZG91YmxlLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gRmxvYXRcclxuICogQHJlYWRvbmx5XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGluIGNjLkNsYXNzXHJcbiAqIG1lbWJlcjoge1xyXG4gKiAgICAgZGVmYXVsdDogW10sXHJcbiAqICAgICB0eXBlOiBjYy5GbG9hdFxyXG4gKiB9XHJcbiAqIC8vIEVTNiBjY2NsYXNzXHJcbiAqIEBjYy5fZGVjb3JhdG9yLnByb3BlcnR5KHtcclxuICogICAgIHR5cGU6IGNjLkZsb2F0XHJcbiAqIH0pXHJcbiAqIG1lbWJlciA9IFtdO1xyXG4gKi9cclxuY2MuRmxvYXQgPSBuZXcgUHJpbWl0aXZlVHlwZSgnRmxvYXQnLCAwKTtcclxuXHJcbmlmIChDQ19FRElUT1IpIHtcclxuICAgIGpzLmdldChjYywgJ051bWJlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy53YXJuSUQoMzYwMyk7XHJcbiAgICAgICAgcmV0dXJuIGNjLkZsb2F0O1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbmRpY2F0ZXMgdGhhdCB0aGUgZWxlbWVudHMgaW4gYXJyYXkgc2hvdWxkIGJlIHR5cGUgYm9vbGVhbi5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IEJvb2xlYW5cclxuICogQHJlYWRvbmx5XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGluIGNjLkNsYXNzXHJcbiAqIG1lbWJlcjoge1xyXG4gKiAgICAgZGVmYXVsdDogW10sXHJcbiAqICAgICB0eXBlOiBjYy5Cb29sZWFuXHJcbiAqIH1cclxuICogLy8gRVM2IGNjY2xhc3NcclxuICogQGNjLl9kZWNvcmF0b3IucHJvcGVydHkoe1xyXG4gKiAgICAgdHlwZTogY2MuQm9vbGVhblxyXG4gKiB9KVxyXG4gKiBtZW1iZXIgPSBbXTtcclxuICovXHJcbmNjLkJvb2xlYW4gPSBuZXcgUHJpbWl0aXZlVHlwZSgnQm9vbGVhbicsIGZhbHNlKTtcclxuXHJcbi8qKlxyXG4gKiBJbmRpY2F0ZXMgdGhhdCB0aGUgZWxlbWVudHMgaW4gYXJyYXkgc2hvdWxkIGJlIHR5cGUgc3RyaW5nLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU3RyaW5nXHJcbiAqIEByZWFkb25seVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBpbiBjYy5DbGFzc1xyXG4gKiBtZW1iZXI6IHtcclxuICogICAgIGRlZmF1bHQ6IFtdLFxyXG4gKiAgICAgdHlwZTogY2MuU3RyaW5nXHJcbiAqIH1cclxuICogLy8gRVM2IGNjY2xhc3NcclxuICogQGNjLl9kZWNvcmF0b3IucHJvcGVydHkoe1xyXG4gKiAgICAgdHlwZTogY2MuU3RyaW5nXHJcbiAqIH0pXHJcbiAqIG1lbWJlciA9IFtdO1xyXG4gKi9cclxuY2MuU3RyaW5nID0gbmV3IFByaW1pdGl2ZVR5cGUoJ1N0cmluZycsICcnKTtcclxuXHJcbi8vIEVuc3VyZXMgdGhlIHR5cGUgbWF0Y2hlcyBpdHMgZGVmYXVsdCB2YWx1ZVxyXG5mdW5jdGlvbiBnZXRUeXBlQ2hlY2tlciAodHlwZSwgYXR0ck5hbWUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIG1haW5Qcm9wTmFtZSkge1xyXG4gICAgICAgIHZhciBwcm9wSW5mbyA9ICdcIicgKyBqcy5nZXRDbGFzc05hbWUoY29uc3RydWN0b3IpICsgJy4nICsgbWFpblByb3BOYW1lICsgJ1wiJztcclxuICAgICAgICB2YXIgbWFpblByb3BBdHRycyA9IGF0dHIoY29uc3RydWN0b3IsIG1haW5Qcm9wTmFtZSk7XHJcblxyXG4gICAgICAgIHZhciBtYWluUHJvcEF0dHJzVHlwZSA9IG1haW5Qcm9wQXR0cnMudHlwZTtcclxuICAgICAgICBpZiAobWFpblByb3BBdHRyc1R5cGUgPT09IGNjLkludGVnZXIgfHwgbWFpblByb3BBdHRyc1R5cGUgPT09IGNjLkZsb2F0KSB7XHJcbiAgICAgICAgICAgIG1haW5Qcm9wQXR0cnNUeXBlID0gJ051bWJlcic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1haW5Qcm9wQXR0cnNUeXBlID09PSBjYy5TdHJpbmcgfHwgbWFpblByb3BBdHRyc1R5cGUgPT09IGNjLkJvb2xlYW4pIHtcclxuICAgICAgICAgICAgbWFpblByb3BBdHRyc1R5cGUgPSAnJyArIG1haW5Qcm9wQXR0cnNUeXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWFpblByb3BBdHRyc1R5cGUgIT09IHR5cGUpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDM2MDQsIHByb3BJbmZvKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFtYWluUHJvcEF0dHJzLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGVmYXVsdFZhbCA9IG1haW5Qcm9wQXR0cnMuZGVmYXVsdDtcclxuICAgICAgICBpZiAodHlwZW9mIGRlZmF1bHRWYWwgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGlzQ29udGFpbmVyID0gQXJyYXkuaXNBcnJheShkZWZhdWx0VmFsKSB8fCBpc1BsYWluRW1wdHlPYmooZGVmYXVsdFZhbCk7XHJcbiAgICAgICAgaWYgKGlzQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRlZmF1bHRUeXBlID0gdHlwZW9mIGRlZmF1bHRWYWw7XHJcbiAgICAgICAgdmFyIHR5cGVfbG93ZXJDYXNlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChkZWZhdWx0VHlwZSA9PT0gdHlwZV9sb3dlckNhc2UpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVfbG93ZXJDYXNlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWwgJiYgIShkZWZhdWx0VmFsIGluc3RhbmNlb2YgbWFpblByb3BBdHRycy5jdG9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCgzNjA1LCBwcm9wSW5mbywganMuZ2V0Q2xhc3NOYW1lKG1haW5Qcm9wQXR0cnMuY3RvcikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgIT09ICdOdW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMzYwNiwgYXR0ck5hbWUsIHByb3BJbmZvLCB0eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkZWZhdWx0VHlwZSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gY2MuU3RyaW5nICYmIGRlZmF1bHRWYWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDM2MDcsIHByb3BJbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLndhcm5JRCgzNjExLCBhdHRyTmFtZSwgcHJvcEluZm8sIGRlZmF1bHRUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGUgbWFpblByb3BBdHRycy50eXBlO1xyXG4gICAgfTtcclxufVxyXG5cclxuLy8gRW5zdXJlcyB0aGUgdHlwZSBtYXRjaGVzIGl0cyBkZWZhdWx0IHZhbHVlXHJcbmZ1bmN0aW9uIGdldE9ialR5cGVDaGVja2VyICh0eXBlQ3Rvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjbGFzc0N0b3IsIG1haW5Qcm9wTmFtZSkge1xyXG4gICAgICAgIGdldFR5cGVDaGVja2VyKCdPYmplY3QnLCAndHlwZScpKGNsYXNzQ3RvciwgbWFpblByb3BOYW1lKTtcclxuICAgICAgICAvLyBjaGVjayBWYWx1ZVR5cGVcclxuICAgICAgICB2YXIgZGVmYXVsdERlZiA9IGdldENsYXNzQXR0cnMoY2xhc3NDdG9yKVttYWluUHJvcE5hbWUgKyBERUxJTUVURVIgKyAnZGVmYXVsdCddO1xyXG4gICAgICAgIHZhciBkZWZhdWx0VmFsID0gcmVxdWlyZSgnLi9DQ0NsYXNzJykuZ2V0RGVmYXVsdChkZWZhdWx0RGVmKTtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGVmYXVsdFZhbCkgJiYganMuaXNDaGlsZENsYXNzT2YodHlwZUN0b3IsIGNjLlZhbHVlVHlwZSkpIHtcclxuICAgICAgICAgICAgdmFyIHR5cGVuYW1lID0ganMuZ2V0Q2xhc3NOYW1lKHR5cGVDdG9yKTtcclxuICAgICAgICAgICAgdmFyIGluZm8gPSBjYy5qcy5mb3JtYXRTdHIoJ05vIG5lZWQgdG8gc3BlY2lmeSB0aGUgXCJ0eXBlXCIgb2YgXCIlcy4lc1wiIGJlY2F1c2UgJXMgaXMgYSBjaGlsZCBjbGFzcyBvZiBWYWx1ZVR5cGUuJyxcclxuICAgICAgICAgICAgICAgIGpzLmdldENsYXNzTmFtZShjbGFzc0N0b3IpLCBtYWluUHJvcE5hbWUsIHR5cGVuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGRlZmF1bHREZWYpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhpbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLndhcm5JRCgzNjEyLCBpbmZvLCB0eXBlbmFtZSwganMuZ2V0Q2xhc3NOYW1lKGNsYXNzQ3RvciksIG1haW5Qcm9wTmFtZSwgdHlwZW5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBQcmltaXRpdmVUeXBlLFxyXG4gICAgYXR0cjogYXR0cixcclxuICAgIGdldENsYXNzQXR0cnM6IGdldENsYXNzQXR0cnMsXHJcbiAgICBzZXRDbGFzc0F0dHI6IHNldENsYXNzQXR0cixcclxuICAgIERFTElNRVRFUjogREVMSU1FVEVSLFxyXG4gICAgZ2V0VHlwZUNoZWNrZXJfRVQ6ICgoQ0NfRURJVE9SICYmICFFZGl0b3IuaXNCdWlsZGVyKSB8fCBDQ19URVNUKSAmJiBnZXRUeXBlQ2hlY2tlcixcclxuICAgIGdldE9ialR5cGVDaGVja2VyX0VUOiAoKENDX0VESVRPUiAmJiAhRWRpdG9yLmlzQnVpbGRlcikgfHwgQ0NfVEVTVCkgJiYgZ2V0T2JqVHlwZUNoZWNrZXIsXHJcbiAgICBTY3JpcHRVdWlkOiB7fSwgICAgICAvLyB0aGUgdmFsdWUgd2lsbCBiZSByZXByZXNlbnRlZCBhcyBhIHV1aWQgc3RyaW5nXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9