
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/preprocess.js';
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
var Task = require('./task');

var _require = require('./shared'),
    transformPipeline = _require.transformPipeline,
    RequestType = _require.RequestType;

function preprocess(task, done) {
  var options = task.options,
      subOptions = Object.create(null),
      leftOptions = Object.create(null);

  for (var op in options) {
    switch (op) {
      // can't set these attributes in options
      case RequestType.PATH:
      case RequestType.UUID:
      case RequestType.DIR:
      case RequestType.SCENE:
      case RequestType.URL:
        break;
      // only need these attributes to transform url

      case '__requestType__':
      case '__isNative__':
      case 'ext':
      case 'type':
      case '__nativeName__':
      case 'audioLoadMode':
      case 'bundle':
        subOptions[op] = options[op];
        break;
      // other settings, left to next pipe

      case '__exclude__':
      case '__outputAsArray__':
        leftOptions[op] = options[op];
        break;

      default:
        subOptions[op] = options[op];
        leftOptions[op] = options[op];
        break;
    }
  }

  task.options = leftOptions; // transform url

  var subTask = Task.create({
    input: task.input,
    options: subOptions
  });
  var err = null;

  try {
    task.output = task.source = transformPipeline.sync(subTask);
  } catch (e) {
    err = e;

    for (var i = 0, l = subTask.output.length; i < l; i++) {
      subTask.output[i].recycle();
    }
  }

  subTask.recycle();
  done(err);
}

module.exports = preprocess;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXHByZXByb2Nlc3MuanMiXSwibmFtZXMiOlsiVGFzayIsInJlcXVpcmUiLCJ0cmFuc2Zvcm1QaXBlbGluZSIsIlJlcXVlc3RUeXBlIiwicHJlcHJvY2VzcyIsInRhc2siLCJkb25lIiwib3B0aW9ucyIsInN1Yk9wdGlvbnMiLCJPYmplY3QiLCJjcmVhdGUiLCJsZWZ0T3B0aW9ucyIsIm9wIiwiUEFUSCIsIlVVSUQiLCJESVIiLCJTQ0VORSIsIlVSTCIsInN1YlRhc2siLCJpbnB1dCIsImVyciIsIm91dHB1dCIsInNvdXJjZSIsInN5bmMiLCJlIiwiaSIsImwiLCJsZW5ndGgiLCJyZWN5Y2xlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLElBQUksR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O2VBQzJDQSxPQUFPLENBQUMsVUFBRDtJQUExQ0MsNkJBQUFBO0lBQW1CQyx1QkFBQUE7O0FBRTNCLFNBQVNDLFVBQVQsQ0FBcUJDLElBQXJCLEVBQTJCQyxJQUEzQixFQUFpQztBQUM3QixNQUFJQyxPQUFPLEdBQUdGLElBQUksQ0FBQ0UsT0FBbkI7QUFBQSxNQUE0QkMsVUFBVSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBQXpDO0FBQUEsTUFBOERDLFdBQVcsR0FBR0YsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUE1RTs7QUFFQSxPQUFLLElBQUlFLEVBQVQsSUFBZUwsT0FBZixFQUF3QjtBQUNwQixZQUFRSyxFQUFSO0FBQ0k7QUFDQSxXQUFLVCxXQUFXLENBQUNVLElBQWpCO0FBQ0EsV0FBS1YsV0FBVyxDQUFDVyxJQUFqQjtBQUNBLFdBQUtYLFdBQVcsQ0FBQ1ksR0FBakI7QUFDQSxXQUFLWixXQUFXLENBQUNhLEtBQWpCO0FBQ0EsV0FBS2IsV0FBVyxDQUFDYyxHQUFqQjtBQUF1QjtBQUN2Qjs7QUFDQSxXQUFLLGlCQUFMO0FBQ0EsV0FBSyxjQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0EsV0FBSyxNQUFMO0FBQ0EsV0FBSyxnQkFBTDtBQUNBLFdBQUssZUFBTDtBQUNBLFdBQUssUUFBTDtBQUNJVCxRQUFBQSxVQUFVLENBQUNJLEVBQUQsQ0FBVixHQUFpQkwsT0FBTyxDQUFDSyxFQUFELENBQXhCO0FBQ0E7QUFDSjs7QUFDQSxXQUFLLGFBQUw7QUFDQSxXQUFLLG1CQUFMO0FBQ0lELFFBQUFBLFdBQVcsQ0FBQ0MsRUFBRCxDQUFYLEdBQWtCTCxPQUFPLENBQUNLLEVBQUQsQ0FBekI7QUFDQTs7QUFDSjtBQUNJSixRQUFBQSxVQUFVLENBQUNJLEVBQUQsQ0FBVixHQUFpQkwsT0FBTyxDQUFDSyxFQUFELENBQXhCO0FBQ0FELFFBQUFBLFdBQVcsQ0FBQ0MsRUFBRCxDQUFYLEdBQWtCTCxPQUFPLENBQUNLLEVBQUQsQ0FBekI7QUFDQTtBQXpCUjtBQTJCSDs7QUFDRFAsRUFBQUEsSUFBSSxDQUFDRSxPQUFMLEdBQWVJLFdBQWYsQ0FoQzZCLENBa0M3Qjs7QUFDQSxNQUFJTyxPQUFPLEdBQUdsQixJQUFJLENBQUNVLE1BQUwsQ0FBWTtBQUFDUyxJQUFBQSxLQUFLLEVBQUVkLElBQUksQ0FBQ2MsS0FBYjtBQUFvQlosSUFBQUEsT0FBTyxFQUFFQztBQUE3QixHQUFaLENBQWQ7QUFDQSxNQUFJWSxHQUFHLEdBQUcsSUFBVjs7QUFDQSxNQUFJO0FBQ0FmLElBQUFBLElBQUksQ0FBQ2dCLE1BQUwsR0FBY2hCLElBQUksQ0FBQ2lCLE1BQUwsR0FBY3BCLGlCQUFpQixDQUFDcUIsSUFBbEIsQ0FBdUJMLE9BQXZCLENBQTVCO0FBQ0gsR0FGRCxDQUdBLE9BQU9NLENBQVAsRUFBVTtBQUNOSixJQUFBQSxHQUFHLEdBQUdJLENBQU47O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBUixFQUFXQyxDQUFDLEdBQUdSLE9BQU8sQ0FBQ0csTUFBUixDQUFlTSxNQUFuQyxFQUEyQ0YsQ0FBQyxHQUFHQyxDQUEvQyxFQUFrREQsQ0FBQyxFQUFuRCxFQUF1RDtBQUNuRFAsTUFBQUEsT0FBTyxDQUFDRyxNQUFSLENBQWVJLENBQWYsRUFBa0JHLE9BQWxCO0FBQ0g7QUFDSjs7QUFDRFYsRUFBQUEsT0FBTyxDQUFDVSxPQUFSO0FBQ0F0QixFQUFBQSxJQUFJLENBQUNjLEdBQUQsQ0FBSjtBQUNIOztBQUVEUyxNQUFNLENBQUNDLE9BQVAsR0FBaUIxQixVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmNvbnN0IFRhc2sgPSByZXF1aXJlKCcuL3Rhc2snKTtcclxuY29uc3QgeyB0cmFuc2Zvcm1QaXBlbGluZSwgUmVxdWVzdFR5cGUgfSA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XHJcblxyXG5mdW5jdGlvbiBwcmVwcm9jZXNzICh0YXNrLCBkb25lKSB7XHJcbiAgICB2YXIgb3B0aW9ucyA9IHRhc2sub3B0aW9ucywgc3ViT3B0aW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCksIGxlZnRPcHRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbiAgICBmb3IgKHZhciBvcCBpbiBvcHRpb25zKSB7XHJcbiAgICAgICAgc3dpdGNoIChvcCkge1xyXG4gICAgICAgICAgICAvLyBjYW4ndCBzZXQgdGhlc2UgYXR0cmlidXRlcyBpbiBvcHRpb25zXHJcbiAgICAgICAgICAgIGNhc2UgUmVxdWVzdFR5cGUuUEFUSDpcclxuICAgICAgICAgICAgY2FzZSBSZXF1ZXN0VHlwZS5VVUlEOlxyXG4gICAgICAgICAgICBjYXNlIFJlcXVlc3RUeXBlLkRJUjpcclxuICAgICAgICAgICAgY2FzZSBSZXF1ZXN0VHlwZS5TQ0VORTpcclxuICAgICAgICAgICAgY2FzZSBSZXF1ZXN0VHlwZS5VUkwgOiBicmVhaztcclxuICAgICAgICAgICAgLy8gb25seSBuZWVkIHRoZXNlIGF0dHJpYnV0ZXMgdG8gdHJhbnNmb3JtIHVybFxyXG4gICAgICAgICAgICBjYXNlICdfX3JlcXVlc3RUeXBlX18nOlxyXG4gICAgICAgICAgICBjYXNlICdfX2lzTmF0aXZlX18nOlxyXG4gICAgICAgICAgICBjYXNlICdleHQnIDpcclxuICAgICAgICAgICAgY2FzZSAndHlwZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ19fbmF0aXZlTmFtZV9fJzpcclxuICAgICAgICAgICAgY2FzZSAnYXVkaW9Mb2FkTW9kZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2J1bmRsZSc6XHJcbiAgICAgICAgICAgICAgICBzdWJPcHRpb25zW29wXSA9IG9wdGlvbnNbb3BdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIG90aGVyIHNldHRpbmdzLCBsZWZ0IHRvIG5leHQgcGlwZVxyXG4gICAgICAgICAgICBjYXNlICdfX2V4Y2x1ZGVfXyc6XHJcbiAgICAgICAgICAgIGNhc2UgJ19fb3V0cHV0QXNBcnJheV9fJzpcclxuICAgICAgICAgICAgICAgIGxlZnRPcHRpb25zW29wXSA9IG9wdGlvbnNbb3BdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFxyXG4gICAgICAgICAgICAgICAgc3ViT3B0aW9uc1tvcF0gPSBvcHRpb25zW29wXTtcclxuICAgICAgICAgICAgICAgIGxlZnRPcHRpb25zW29wXSA9IG9wdGlvbnNbb3BdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGFzay5vcHRpb25zID0gbGVmdE9wdGlvbnM7XHJcblxyXG4gICAgLy8gdHJhbnNmb3JtIHVybFxyXG4gICAgbGV0IHN1YlRhc2sgPSBUYXNrLmNyZWF0ZSh7aW5wdXQ6IHRhc2suaW5wdXQsIG9wdGlvbnM6IHN1Yk9wdGlvbnN9KTtcclxuICAgIHZhciBlcnIgPSBudWxsO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB0YXNrLm91dHB1dCA9IHRhc2suc291cmNlID0gdHJhbnNmb3JtUGlwZWxpbmUuc3luYyhzdWJUYXNrKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgZXJyID0gZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN1YlRhc2sub3V0cHV0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBzdWJUYXNrLm91dHB1dFtpXS5yZWN5Y2xlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3ViVGFzay5yZWN5Y2xlKCk7XHJcbiAgICBkb25lKGVycik7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHJlcHJvY2VzczsiXSwic291cmNlUm9vdCI6Ii8ifQ==