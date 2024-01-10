
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/deserialize.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
var helper = require('./helper');

var MissingClass = CC_EDITOR && Editor.require('app://editor/page/scene-utils/missing-class-reporter').MissingClass;

require('../platform/deserialize');

function deserialize(json, options) {
  var classFinder, missingClass;

  if (CC_EDITOR) {
    missingClass = MissingClass;

    classFinder = function classFinder(type, data, owner, propName) {
      var res = missingClass.classFinder(type, data, owner, propName);

      if (res) {
        return res;
      }

      return cc._MissingScript;
    };

    classFinder.onDereferenced = missingClass.classFinder.onDereferenced;
  } else {
    classFinder = cc._MissingScript.safeFindClass;
  }

  var pool = null;

  if (!CC_PREVIEW) {
    pool = cc.deserialize.Details.pool;
  } else {
    var _require = require('../platform/deserialize-compiled'),
        deserializeForCompiled = _require["default"];

    var deserializeForEditor = require('../platform/deserialize-editor');

    if (deserializeForCompiled.isCompiledJson(json)) {
      pool = deserializeForCompiled.Details.pool;
    } else {
      pool = deserializeForEditor.Details.pool;
    }
  }

  var tdInfo = pool.get();
  var asset;

  try {
    asset = cc.deserialize(json, tdInfo, {
      classFinder: classFinder,
      customEnv: options
    });
  } catch (e) {
    pool.put(tdInfo);
    throw e;
  }

  if (CC_EDITOR && missingClass) {
    missingClass.reportMissingClass(asset);
    missingClass.reset();
  }

  var uuidList = tdInfo.uuidList;
  var objList = tdInfo.uuidObjList;
  var propList = tdInfo.uuidPropList;
  var depends = [];

  for (var i = 0; i < uuidList.length; i++) {
    var dependUuid = uuidList[i];
    depends[i] = {
      uuid: helper.decodeUuid(dependUuid),
      owner: objList[i],
      prop: propList[i]
    };
  } // non-native deps


  asset.__depends__ = depends; // native dep

  asset._native && (asset.__nativeDepend__ = true);
  pool.put(tdInfo);
  return asset;
}

module.exports = deserialize;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGRlc2VyaWFsaXplLmpzIl0sIm5hbWVzIjpbImhlbHBlciIsInJlcXVpcmUiLCJNaXNzaW5nQ2xhc3MiLCJDQ19FRElUT1IiLCJFZGl0b3IiLCJkZXNlcmlhbGl6ZSIsImpzb24iLCJvcHRpb25zIiwiY2xhc3NGaW5kZXIiLCJtaXNzaW5nQ2xhc3MiLCJ0eXBlIiwiZGF0YSIsIm93bmVyIiwicHJvcE5hbWUiLCJyZXMiLCJjYyIsIl9NaXNzaW5nU2NyaXB0Iiwib25EZXJlZmVyZW5jZWQiLCJzYWZlRmluZENsYXNzIiwicG9vbCIsIkNDX1BSRVZJRVciLCJEZXRhaWxzIiwiZGVzZXJpYWxpemVGb3JDb21waWxlZCIsImRlc2VyaWFsaXplRm9yRWRpdG9yIiwiaXNDb21waWxlZEpzb24iLCJ0ZEluZm8iLCJnZXQiLCJhc3NldCIsImN1c3RvbUVudiIsImUiLCJwdXQiLCJyZXBvcnRNaXNzaW5nQ2xhc3MiLCJyZXNldCIsInV1aWRMaXN0Iiwib2JqTGlzdCIsInV1aWRPYmpMaXN0IiwicHJvcExpc3QiLCJ1dWlkUHJvcExpc3QiLCJkZXBlbmRzIiwiaSIsImxlbmd0aCIsImRlcGVuZFV1aWQiLCJ1dWlkIiwiZGVjb2RlVXVpZCIsInByb3AiLCJfX2RlcGVuZHNfXyIsIl9uYXRpdmUiLCJfX25hdGl2ZURlcGVuZF9fIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0EsSUFBTUMsWUFBWSxHQUFHQyxTQUFTLElBQUlDLE1BQU0sQ0FBQ0gsT0FBUCxDQUFl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QUVUN0IsTUFBQUEsS0FBSyxFQUFFc0IsT0FBTyxDQUFDSyxDQUFELENBRkw7QUFHVEssTUFBQUEsSUFBSSxFQUFFUixRQUFRLENBQUNHLENBQUQ7QUFITCxLQUFiO0FBS0gsR0E5RGdDLENBZ0VqQzs7O0FBQ0FaLEVBQUFBLEtBQUssQ0FBQ2tCLFdBQU4sR0FBb0JQLE9BQXBCLENBakVpQyxDQWtFakM7O0FBQ0FYLEVBQUFBLEtBQUssQ0FBQ21CLE9BQU4sS0FBa0JuQixLQUFLLENBQUNvQixnQkFBTixHQUF5QixJQUEzQztBQUNBNUIsRUFBQUEsSUFBSSxDQUFDVyxHQUFMLENBQVNMLE1BQVQ7QUFDQSxTQUFPRSxLQUFQO0FBRUg7O0FBRURxQixNQUFNLENBQUNDLE9BQVAsR0FBaUI1QyxXQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBoZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpO1xyXG5jb25zdCBNaXNzaW5nQ2xhc3MgPSBDQ19FRElUT1IgJiYgRWRpdG9yLnJlcXVpcmUoJ2FwcDovL2VkaXRvci9wYWdlL3NjZW5lLXV0aWxzL21pc3NpbmctY2xhc3MtcmVwb3J0ZXInKS5NaXNzaW5nQ2xhc3M7XHJcbnJlcXVpcmUoJy4uL3BsYXRmb3JtL2Rlc2VyaWFsaXplJyk7XHJcblxyXG5mdW5jdGlvbiBkZXNlcmlhbGl6ZSAoanNvbiwgb3B0aW9ucykge1xyXG4gICAgdmFyIGNsYXNzRmluZGVyLCBtaXNzaW5nQ2xhc3M7XHJcbiAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgbWlzc2luZ0NsYXNzID0gTWlzc2luZ0NsYXNzO1xyXG4gICAgICAgIGNsYXNzRmluZGVyID0gZnVuY3Rpb24gKHR5cGUsIGRhdGEsIG93bmVyLCBwcm9wTmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gbWlzc2luZ0NsYXNzLmNsYXNzRmluZGVyKHR5cGUsIGRhdGEsIG93bmVyLCBwcm9wTmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNjLl9NaXNzaW5nU2NyaXB0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2xhc3NGaW5kZXIub25EZXJlZmVyZW5jZWQgPSBtaXNzaW5nQ2xhc3MuY2xhc3NGaW5kZXIub25EZXJlZmVyZW5jZWQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjbGFzc0ZpbmRlciA9IGNjLl9NaXNzaW5nU2NyaXB0LnNhZmVGaW5kQ2xhc3M7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBvb2wgPSBudWxsO1xyXG4gICAgaWYgKCFDQ19QUkVWSUVXKSB7XHJcbiAgICAgICAgcG9vbCA9IGNjLmRlc2VyaWFsaXplLkRldGFpbHMucG9vbDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxldCB7IGRlZmF1bHQ6IGRlc2VyaWFsaXplRm9yQ29tcGlsZWQgfSA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2Rlc2VyaWFsaXplLWNvbXBpbGVkJyk7XHJcbiAgICAgICAgbGV0IGRlc2VyaWFsaXplRm9yRWRpdG9yID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vZGVzZXJpYWxpemUtZWRpdG9yJyk7XHJcbiAgICAgICAgaWYgKGRlc2VyaWFsaXplRm9yQ29tcGlsZWQuaXNDb21waWxlZEpzb24oanNvbikpIHtcclxuICAgICAgICAgICAgcG9vbCA9IGRlc2VyaWFsaXplRm9yQ29tcGlsZWQuRGV0YWlscy5wb29sO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcG9vbCA9IGRlc2VyaWFsaXplRm9yRWRpdG9yLkRldGFpbHMucG9vbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgdGRJbmZvID0gcG9vbC5nZXQoKTtcclxuXHJcbiAgICB2YXIgYXNzZXQ7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGFzc2V0ID0gY2MuZGVzZXJpYWxpemUoanNvbiwgdGRJbmZvLCB7XHJcbiAgICAgICAgICAgIGNsYXNzRmluZGVyOiBjbGFzc0ZpbmRlcixcclxuICAgICAgICAgICAgY3VzdG9tRW52OiBvcHRpb25zXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIHBvb2wucHV0KHRkSW5mbyk7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQ0NfRURJVE9SICYmIG1pc3NpbmdDbGFzcykge1xyXG4gICAgICAgIG1pc3NpbmdDbGFzcy5yZXBvcnRNaXNzaW5nQ2xhc3MoYXNzZXQpO1xyXG4gICAgICAgIG1pc3NpbmdDbGFzcy5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB1dWlkTGlzdCA9IHRkSW5mby51dWlkTGlzdDtcclxuICAgIHZhciBvYmpMaXN0ID0gdGRJbmZvLnV1aWRPYmpMaXN0O1xyXG4gICAgdmFyIHByb3BMaXN0ID0gdGRJbmZvLnV1aWRQcm9wTGlzdDtcclxuICAgIHZhciBkZXBlbmRzID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1dWlkTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBkZXBlbmRVdWlkID0gdXVpZExpc3RbaV07XHJcbiAgICAgICAgZGVwZW5kc1tpXSA9IHtcclxuICAgICAgICAgICAgdXVpZDogaGVscGVyLmRlY29kZVV1aWQoZGVwZW5kVXVpZCksXHJcbiAgICAgICAgICAgIG93bmVyOiBvYmpMaXN0W2ldLFxyXG4gICAgICAgICAgICBwcm9wOiBwcm9wTGlzdFtpXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbm9uLW5hdGl2ZSBkZXBzXHJcbiAgICBhc3NldC5fX2RlcGVuZHNfXyA9IGRlcGVuZHM7XHJcbiAgICAvLyBuYXRpdmUgZGVwXHJcbiAgICBhc3NldC5fbmF0aXZlICYmIChhc3NldC5fX25hdGl2ZURlcGVuZF9fID0gdHJ1ZSk7XHJcbiAgICBwb29sLnB1dCh0ZEluZm8pO1xyXG4gICAgcmV0dXJuIGFzc2V0O1xyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkZXNlcmlhbGl6ZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=