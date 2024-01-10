
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCEnum.js';
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
var js = require('./js'); // enum

/**
 * !#en
 * Define an enum type. <br/>
 * If a enum item has a value of -1, it will be given an Integer number according to it's order in the list.<br/>
 * Otherwise it will use the value specified by user who writes the enum definition.
 *
 * !#zh
 * 定义一个枚举类型。<br/>
 * 用户可以把枚举值设为任意的整数，如果设为 -1，系统将会分配为上一个枚举值 + 1。
 *
 * @method Enum
 * @param {object} obj - a JavaScript literal object containing enum names and values, or a TypeScript enum type
 * @return {object} the defined enum type
 * @example {@link cocos2d/core/platform/CCEnum/Enum.js}
 * @typescript Enum<T>(obj: T): T
 */


function Enum(obj) {
  if ('__enums__' in obj) {
    return obj;
  }

  js.value(obj, '__enums__', null, true);
  var lastIndex = -1;
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];

    if (val === -1) {
      val = ++lastIndex;
      obj[key] = val;
    } else {
      if (typeof val === 'number') {
        lastIndex = val;
      } else if (typeof val === 'string' && Number.isInteger(parseFloat(key))) {
        continue;
      }
    }

    var reverseKey = '' + val;

    if (key !== reverseKey) {
      if ((CC_EDITOR || CC_TEST) && reverseKey in obj && obj[reverseKey] !== key) {
        cc.errorID(7100, reverseKey);
        continue;
      }

      js.value(obj, reverseKey, key);
    }
  }

  return obj;
}

Enum.isEnum = function (enumType) {
  return enumType && enumType.hasOwnProperty('__enums__');
};
/**
 * @method getList
 * @param {Object} enumDef - the enum type defined from cc.Enum
 * @return {Object[]}
 * @private
 */


Enum.getList = function (enumDef) {
  if (enumDef.__enums__) return enumDef.__enums__;
  var enums = enumDef.__enums__ = [];

  for (var name in enumDef) {
    var value = enumDef[name];

    if (Number.isInteger(value)) {
      enums.push({
        name: name,
        value: value
      });
    }
  }

  enums.sort(function (a, b) {
    return a.value - b.value;
  });
  return enums;
};

if (CC_DEV) {
  // check key order in object literal
  var _TestEnum = Enum({
    ZERO: -1,
    ONE: -1,
    TWO: -1,
    THREE: -1
  });

  if (_TestEnum.ZERO !== 0 || _TestEnum.ONE !== 1 || _TestEnum.THREE !== 3) {
    cc.errorID(7101);
  }
}

module.exports = cc.Enum = Enum;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxDQ0VudW0uanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwiRW51bSIsIm9iaiIsInZhbHVlIiwibGFzdEluZGV4Iiwia2V5cyIsIk9iamVjdCIsImkiLCJsZW5ndGgiLCJrZXkiLCJ2YWwiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJwYXJzZUZsb2F0IiwicmV2ZXJzZUtleSIsIkNDX0VESVRPUiIsIkNDX1RFU1QiLCJjYyIsImVycm9ySUQiLCJpc0VudW0iLCJlbnVtVHlwZSIsImhhc093blByb3BlcnR5IiwiZ2V0TGlzdCIsImVudW1EZWYiLCJfX2VudW1zX18iLCJlbnVtcyIsIm5hbWUiLCJwdXNoIiwic29ydCIsImEiLCJiIiwiQ0NfREVWIiwiX1Rlc3RFbnVtIiwiWkVSTyIsIk9ORSIsIlRXTyIsIlRIUkVFIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFoQixFQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxTQUFTQyxJQUFULENBQWVDLEdBQWYsRUFBb0I7QUFDaEIsTUFBSSxlQUFlQSxHQUFuQixFQUF3QjtBQUNwQixXQUFPQSxHQUFQO0FBQ0g7O0FBQ0RILEVBQUFBLEVBQUUsQ0FBQ0ksS0FBSCxDQUFTRCxHQUFULEVBQWMsV0FBZCxFQUEyQixJQUEzQixFQUFpQyxJQUFqQztBQUVBLE1BQUlFLFNBQVMsR0FBRyxDQUFDLENBQWpC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Q0FBQ0MsSUFBVixLQUFtQixDQUFuQixJQUF3QkQsU0FBUyxDQUFDRSxHQUFWLEtBQWtCLENBQTFDLElBQStDRixTQUFTLENBQUNJLEtBQVYsS0FBb0IsQ0FBdkUsRUFBMEU7QUFDdEVuQixJQUFBQSxFQUFFLENBQUNDLE9BQUgsQ0FBVyxJQUFYO0FBQ0g7QUFDSjs7QUFFRG1CLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnJCLEVBQUUsQ0FBQ2hCLElBQUgsR0FBVUEsSUFBM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIganMgPSByZXF1aXJlKCcuL2pzJyk7XHJcblxyXG4vLyBlbnVtXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBEZWZpbmUgYW4gZW51bSB0eXBlLiA8YnIvPlxyXG4gKiBJZiBhIGVudW0gaXRlbSBoYXMgYSB2YWx1ZSBvZiAtMSwgaXQgd2lsbCBiZSBnaXZlbiBhbiBJbnRlZ2VyIG51bWJlciBhY2NvcmRpbmcgdG8gaXQncyBvcmRlciBpbiB0aGUgbGlzdC48YnIvPlxyXG4gKiBPdGhlcndpc2UgaXQgd2lsbCB1c2UgdGhlIHZhbHVlIHNwZWNpZmllZCBieSB1c2VyIHdobyB3cml0ZXMgdGhlIGVudW0gZGVmaW5pdGlvbi5cclxuICpcclxuICogISN6aFxyXG4gKiDlrprkuYnkuIDkuKrmnprkuL7nsbvlnovjgII8YnIvPlxyXG4gKiDnlKjmiLflj6/ku6XmiormnprkuL7lgLzorr7kuLrku7vmhI/nmoTmlbTmlbDvvIzlpoLmnpzorr7kuLogLTHvvIzns7vnu5/lsIbkvJrliIbphY3kuLrkuIrkuIDkuKrmnprkuL7lgLwgKyAx44CCXHJcbiAqXHJcbiAqIEBtZXRob2QgRW51bVxyXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqIC0gYSBKYXZhU2NyaXB0IGxpdGVyYWwgb2JqZWN0IGNvbnRhaW5pbmcgZW51bSBuYW1lcyBhbmQgdmFsdWVzLCBvciBhIFR5cGVTY3JpcHQgZW51bSB0eXBlXHJcbiAqIEByZXR1cm4ge29iamVjdH0gdGhlIGRlZmluZWQgZW51bSB0eXBlXHJcbiAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvcGxhdGZvcm0vQ0NFbnVtL0VudW0uanN9XHJcbiAqIEB0eXBlc2NyaXB0IEVudW08VD4ob2JqOiBUKTogVFxyXG4gKi9cclxuZnVuY3Rpb24gRW51bSAob2JqKSB7XHJcbiAgICBpZiAoJ19fZW51bXNfXycgaW4gb2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGpzLnZhbHVlKG9iaiwgJ19fZW51bXNfXycsIG51bGwsIHRydWUpO1xyXG5cclxuICAgIHZhciBsYXN0SW5kZXggPSAtMTtcclxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKHZhbCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgdmFsID0gKytsYXN0SW5kZXg7XHJcbiAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0SW5kZXggPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgTnVtYmVyLmlzSW50ZWdlcihwYXJzZUZsb2F0KGtleSkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmV2ZXJzZUtleSA9ICcnICsgdmFsO1xyXG4gICAgICAgIGlmIChrZXkgIT09IHJldmVyc2VLZXkpIHtcclxuICAgICAgICAgICAgaWYgKChDQ19FRElUT1IgfHwgQ0NfVEVTVCkgJiYgcmV2ZXJzZUtleSBpbiBvYmogJiYgb2JqW3JldmVyc2VLZXldICE9PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNzEwMCwgcmV2ZXJzZUtleSk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBqcy52YWx1ZShvYmosIHJldmVyc2VLZXksIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuRW51bS5pc0VudW0gPSBmdW5jdGlvbiAoZW51bVR5cGUpIHtcclxuICAgIHJldHVybiBlbnVtVHlwZSAmJiBlbnVtVHlwZS5oYXNPd25Qcm9wZXJ0eSgnX19lbnVtc19fJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQG1ldGhvZCBnZXRMaXN0XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnVtRGVmIC0gdGhlIGVudW0gdHlwZSBkZWZpbmVkIGZyb20gY2MuRW51bVxyXG4gKiBAcmV0dXJuIHtPYmplY3RbXX1cclxuICogQHByaXZhdGVcclxuICovXHJcbkVudW0uZ2V0TGlzdCA9IGZ1bmN0aW9uIChlbnVtRGVmKSB7XHJcbiAgICBpZiAoZW51bURlZi5fX2VudW1zX18pXHJcbiAgICAgICAgcmV0dXJuIGVudW1EZWYuX19lbnVtc19fO1xyXG5cclxuICAgIHZhciBlbnVtcyA9IGVudW1EZWYuX19lbnVtc19fID0gW107XHJcbiAgICBmb3IgKHZhciBuYW1lIGluIGVudW1EZWYpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBlbnVtRGVmW25hbWVdO1xyXG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSkge1xyXG4gICAgICAgICAgICBlbnVtcy5wdXNoKHsgbmFtZSwgdmFsdWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZW51bXMuc29ydCggZnVuY3Rpb24gKCBhLCBiICkgeyByZXR1cm4gYS52YWx1ZSAtIGIudmFsdWU7IH0gKTtcclxuICAgIHJldHVybiBlbnVtcztcclxufTtcclxuXHJcbmlmIChDQ19ERVYpIHtcclxuICAgIC8vIGNoZWNrIGtleSBvcmRlciBpbiBvYmplY3QgbGl0ZXJhbFxyXG4gICAgdmFyIF9UZXN0RW51bSA9IEVudW0oe1xyXG4gICAgICAgIFpFUk86IC0xLFxyXG4gICAgICAgIE9ORTogLTEsXHJcbiAgICAgICAgVFdPOiAtMSxcclxuICAgICAgICBUSFJFRTogLTFcclxuICAgIH0pO1xyXG4gICAgaWYgKF9UZXN0RW51bS5aRVJPICE9PSAwIHx8IF9UZXN0RW51bS5PTkUgIT09IDEgfHwgX1Rlc3RFbnVtLlRIUkVFICE9PSAzKSB7XHJcbiAgICAgICAgY2MuZXJyb3JJRCg3MTAxKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5FbnVtID0gRW51bTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=