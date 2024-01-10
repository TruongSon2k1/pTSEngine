
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/compiler.js';
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
function deepFlatten(strList, array) {
  for (var i = 0; i < array.length; i++) {
    var item = array[i];

    if (Array.isArray(item)) {
      deepFlatten(strList, item);
    } // else if (item instanceof Declaration) {
    //     strList.push(item.toString());
    // }
    else {
        strList.push(item);
      }
  }
}

function flattenCodeArray(array) {
  var separator = CC_DEV ? '\n' : '';
  var strList = [];
  deepFlatten(strList, array);
  return strList.join(separator);
}

module.exports = {
  flattenCodeArray: flattenCodeArray
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxjb21waWxlci5qcyJdLCJuYW1lcyI6WyJkZWVwRmxhdHRlbiIsInN0ckxpc3QiLCJhcnJheSIsImkiLCJsZW5ndGgiLCJpdGVtIiwiQXJyYXkiLCJpc0FycmF5IiwicHVzaCIsImZsYXR0ZW5Db2RlQXJyYXkiLCJzZXBhcmF0b3IiLCJDQ19ERVYiLCJqb2luIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsU0FBU0EsV0FBVCxDQUFzQkMsT0FBdEIsRUFBK0JDLEtBQS9CLEVBQXNDO0FBQ2xDLE9BQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsS0FBSyxDQUFDRSxNQUExQixFQUFrQ0QsQ0FBQyxFQUFuQyxFQUF1QztBQUNuQyxRQUFJRSxJQUFJLEdBQUdILEtBQUssQ0FBQ0MsQ0FBRCxDQUFoQjs7QUFDQSxRQUFJRyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsSUFBZCxDQUFKLEVBQXlCO0FBQ3JCTCxNQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBVUksSUFBVixDQUFYO0FBQ0gsS0FGRCxDQUdBO0FBQ0E7QUFDQTtBQUxBLFNBTUs7QUFDREosUUFBQUEsT0FBTyxDQUFDTyxJQUFSLENBQWFILElBQWI7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsU0FBU0ksZ0JBQVQsQ0FBMkJQLEtBQTNCLEVBQWtDO0FBQzlCLE1BQUlRLFNBQVMsR0FBR0MsTUFBTSxHQUFHLElBQUgsR0FBVSxFQUFoQztBQUNBLE1BQUlWLE9BQU8sR0FBRyxFQUFkO0FBQ0FELEVBQUFBLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVQyxLQUFWLENBQVg7QUFDQSxTQUFPRCxPQUFPLENBQUNXLElBQVIsQ0FBYUYsU0FBYixDQUFQO0FBQ0g7O0FBRURHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiTCxFQUFBQSxnQkFBZ0IsRUFBaEJBO0FBRGEsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5mdW5jdGlvbiBkZWVwRmxhdHRlbiAoc3RyTGlzdCwgYXJyYXkpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgaXRlbSA9IGFycmF5W2ldO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIGRlZXBGbGF0dGVuKHN0ckxpc3QsIGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBlbHNlIGlmIChpdGVtIGluc3RhbmNlb2YgRGVjbGFyYXRpb24pIHtcclxuICAgICAgICAvLyAgICAgc3RyTGlzdC5wdXNoKGl0ZW0udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzdHJMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmbGF0dGVuQ29kZUFycmF5IChhcnJheSkge1xyXG4gICAgdmFyIHNlcGFyYXRvciA9IENDX0RFViA/ICdcXG4nIDogJyc7XHJcbiAgICB2YXIgc3RyTGlzdCA9IFtdO1xyXG4gICAgZGVlcEZsYXR0ZW4oc3RyTGlzdCwgYXJyYXkpO1xyXG4gICAgcmV0dXJuIHN0ckxpc3Quam9pbihzZXBhcmF0b3IpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGZsYXR0ZW5Db2RlQXJyYXlcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=