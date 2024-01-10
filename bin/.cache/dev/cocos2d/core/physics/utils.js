
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
function getWorldRotation(node) {
  var rot = node.angle;
  var parent = node.parent;

  while (parent.parent) {
    rot += parent.angle;
    parent = parent.parent;
  }

  return -rot;
}

function getWorldScale(node) {
  var scaleX = node.scaleX;
  var scaleY = node.scaleY;
  var parent = node.parent;

  while (parent.parent) {
    scaleX *= parent.scaleX;
    scaleY *= parent.scaleY;
    parent = parent.parent;
  }

  return cc.v2(scaleX, scaleY);
}

function convertToNodeRotation(node, rotation) {
  rotation -= -node.angle;
  var parent = node.parent;

  while (parent.parent) {
    rotation -= -parent.angle;
    parent = parent.parent;
  }

  return rotation;
}

module.exports = {
  getWorldRotation: getWorldRotation,
  getWorldScale: getWorldScale,
  convertToNodeRotation: convertToNodeRotation
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXHV0aWxzLmpzIl0sIm5hbWVzIjpbImdldFdvcmxkUm90YXRpb24iLCJub2RlIiwicm90IiwiYW5nbGUiLCJwYXJlbnQiLCJnZXRXb3JsZFNjYWxlIiwic2NhbGVYIiwic2NhbGVZIiwiY2MiLCJ2MiIsImNvbnZlcnRUb05vZGVSb3RhdGlvbiIsInJvdGF0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLFNBQVNBLGdCQUFULENBQTJCQyxJQUEzQixFQUFpQztBQUM3QixNQUFJQyxHQUFHLEdBQUdELElBQUksQ0FBQ0UsS0FBZjtBQUNBLE1BQUlDLE1BQU0sR0FBR0gsSUFBSSxDQUFDRyxNQUFsQjs7QUFDQSxTQUFNQSxNQUFNLENBQUNBLE1BQWIsRUFBb0I7QUFDaEJGLElBQUFBLEdBQUcsSUFBSUUsTUFBTSxDQUFDRCxLQUFkO0FBQ0FDLElBQUFBLE1BQU0sR0FBR0EsTUFBTSxDQUFDQSxNQUFoQjtBQUNIOztBQUNELFNBQU8sQ0FBQ0YsR0FBUjtBQUNIOztBQUVELFNBQVNHLGFBQVQsQ0FBd0JKLElBQXhCLEVBQThCO0FBQzFCLE1BQUlLLE1BQU0sR0FBR0wsSUFBSSxDQUFDSyxNQUFsQjtBQUNBLE1BQUlDLE1BQU0sR0FBR04sSUFBSSxDQUFDTSxNQUFsQjtBQUVBLE1BQUlILE1BQU0sR0FBR0gsSUFBSSxDQUFDRyxNQUFsQjs7QUFDQSxTQUFNQSxNQUFNLENBQUNBLE1BQWIsRUFBb0I7QUFDaEJFLElBQUFBLE1BQU0sSUFBSUYsTUFBTSxDQUFDRSxNQUFqQjtBQUNBQyxJQUFBQSxNQUFNLElBQUlILE1BQU0sQ0FBQ0csTUFBakI7QUFFQUgsSUFBQUEsTUFBTSxHQUFHQSxNQUFNLENBQUNBLE1BQWhCO0FBQ0g7O0FBRUQsU0FBT0ksRUFBRSxDQUFDQyxFQUFILENBQU1ILE1BQU4sRUFBY0MsTUFBZCxDQUFQO0FBQ0g7O0FBRUQsU0FBU0cscUJBQVQsQ0FBZ0NULElBQWhDLEVBQXNDVSxRQUF0QyxFQUFnRDtBQUM1Q0EsRUFBQUEsUUFBUSxJQUFJLENBQUNWLElBQUksQ0FBQ0UsS0FBbEI7QUFDQSxNQUFJQyxNQUFNLEdBQUdILElBQUksQ0FBQ0csTUFBbEI7O0FBQ0EsU0FBTUEsTUFBTSxDQUFDQSxNQUFiLEVBQW9CO0FBQ2hCTyxJQUFBQSxRQUFRLElBQUksQ0FBQ1AsTUFBTSxDQUFDRCxLQUFwQjtBQUNBQyxJQUFBQSxNQUFNLEdBQUdBLE1BQU0sQ0FBQ0EsTUFBaEI7QUFDSDs7QUFDRCxTQUFPTyxRQUFQO0FBQ0g7O0FBRURDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiYixFQUFBQSxnQkFBZ0IsRUFBRUEsZ0JBREw7QUFFYkssRUFBQUEsYUFBYSxFQUFFQSxhQUZGO0FBR2JLLEVBQUFBLHFCQUFxQixFQUFFQTtBQUhWLENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5mdW5jdGlvbiBnZXRXb3JsZFJvdGF0aW9uIChub2RlKSB7XHJcbiAgICB2YXIgcm90ID0gbm9kZS5hbmdsZTtcclxuICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudDtcclxuICAgIHdoaWxlKHBhcmVudC5wYXJlbnQpe1xyXG4gICAgICAgIHJvdCArPSBwYXJlbnQuYW5nbGU7XHJcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcclxuICAgIH1cclxuICAgIHJldHVybiAtcm90O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXb3JsZFNjYWxlIChub2RlKSB7XHJcbiAgICB2YXIgc2NhbGVYID0gbm9kZS5zY2FsZVg7XHJcbiAgICB2YXIgc2NhbGVZID0gbm9kZS5zY2FsZVk7XHJcblxyXG4gICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50O1xyXG4gICAgd2hpbGUocGFyZW50LnBhcmVudCl7XHJcbiAgICAgICAgc2NhbGVYICo9IHBhcmVudC5zY2FsZVg7XHJcbiAgICAgICAgc2NhbGVZICo9IHBhcmVudC5zY2FsZVk7XHJcblxyXG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNjLnYyKHNjYWxlWCwgc2NhbGVZKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29udmVydFRvTm9kZVJvdGF0aW9uIChub2RlLCByb3RhdGlvbikge1xyXG4gICAgcm90YXRpb24gLT0gLW5vZGUuYW5nbGU7XHJcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XHJcbiAgICB3aGlsZShwYXJlbnQucGFyZW50KXtcclxuICAgICAgICByb3RhdGlvbiAtPSAtcGFyZW50LmFuZ2xlO1xyXG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm90YXRpb247XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZ2V0V29ybGRSb3RhdGlvbjogZ2V0V29ybGRSb3RhdGlvbixcclxuICAgIGdldFdvcmxkU2NhbGU6IGdldFdvcmxkU2NhbGUsXHJcbiAgICBjb252ZXJ0VG9Ob2RlUm90YXRpb246IGNvbnZlcnRUb05vZGVSb3RhdGlvblxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==