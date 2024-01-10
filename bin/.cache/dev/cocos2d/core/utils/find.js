
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/find.js';
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

/**
 * Finds a node by hierarchy path, the path is case-sensitive.
 * It will traverse the hierarchy by splitting the path using '/' character.
 * This function will still returns the node even if it is inactive.
 * It is recommended to not use this function every frame instead cache the result at startup.
 *
 * @method find
 * @static
 * @param {String} path
 * @param {Node} [referenceNode]
 * @return {Node|null} the node or null if not found
 */
cc.find = module.exports = function (path, referenceNode) {
  if (path == null) {
    cc.errorID(3814);
    return null;
  }

  if (!referenceNode) {
    var scene = cc.director.getScene();

    if (!scene) {
      if (CC_DEV) {
        cc.warnID(5601);
      }

      return null;
    } else if (CC_DEV && !scene.isValid) {
      cc.warnID(5602);
      return null;
    }

    referenceNode = scene;
  } else if (CC_DEV && !referenceNode.isValid) {
    cc.warnID(5603);
    return null;
  }

  var match = referenceNode;
  var startIndex = path[0] !== '/' ? 0 : 1; // skip first '/'

  var nameList = path.split('/'); // parse path

  for (var n = startIndex; n < nameList.length; n++) {
    var name = nameList[n];
    var children = match._children;
    match = null;

    for (var t = 0, len = children.length; t < len; ++t) {
      var subChild = children[t];

      if (subChild.name === name) {
        match = subChild;
        break;
      }
    }

    if (!match) {
      return null;
    }
  }

  return match;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxmaW5kLmpzIl0sIm5hbWVzIjpbImNjIiwiZmluZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJwYXRoIiwicmVmZXJlbmNlTm9kZSIsImVycm9ySUQiLCJzY2VuZSIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJDQ19ERVYiLCJ3YXJuSUQiLCJpc1ZhbGlkIiwibWF0Y2giLCJzdGFydEluZGV4IiwibmFtZUxpc3QiLCJzcGxpdCIsIm4iLCJsZW5ndGgiLCJuYW1lIiwiY2hpbGRyZW4iLCJfY2hpbGRyZW4iLCJ0IiwibGVuIiwic3ViQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxJQUFILEdBQVVDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixVQUFVQyxJQUFWLEVBQWdCQyxhQUFoQixFQUErQjtBQUN0RCxNQUFJRCxJQUFJLElBQUksSUFBWixFQUFrQjtBQUNkSixJQUFBQSxFQUFFLENBQUNNLE9BQUgsQ0FBVyxJQUFYO0FBQ0EsV0FBTyxJQUFQO0FBQ0g7O0FBQ0QsTUFBSSxDQUFDRCxhQUFMLEVBQW9CO0FBQ2hCLFFBQUlFLEtBQUssR0FBR1AsRUFBRSxDQUFDUSxRQUFILENBQVlDLFFBQVosRUFBWjs7QUFDQSxRQUFJLENBQUNGLEtBQUwsRUFBWTtBQUNSLFVBQUlHLE1BQUosRUFBWTtBQUNSVixRQUFBQSxFQUFFLENBQUNXLE1BQUgsQ0FBVSxJQUFWO0FBQ0g7O0FBQ0QsYUFBTyxJQUFQO0FBQ0gsS0FMRCxNQU1LLElBQUlELE1BQU0sSUFBSSxDQUFDSCxLQUFLLENBQUNLLE9BQXJCLEVBQThCO0FBQy9CWixNQUFBQSxFQUFFLENBQUNXLE1BQUgsQ0FBVSxJQUFWO0FBQ0EsYUFBTyxJQUFQO0FBQ0g7O0FBQ0ROLElBQUFBLGFBQWEsR0FBR0UsS0FBaEI7QUFDSCxHQWJELE1BY0ssSUFBSUcsTUFBTSxJQUFJLENBQUNMLGFBQWEsQ0FBQ08sT0FBN0IsRUFBc0M7QUFDdkNaLElBQUFBLEVBQUUsQ0FBQ1csTUFBSCxDQUFVLElBQVY7QUFDQSxXQUFPLElBQVA7QUFDSDs7QUFFRCxNQUFJRSxLQUFLLEdBQUdSLGFBQVo7QUFDQSxNQUFJUyxVQUFVLEdBQUlWLElBQUksQ0FBQyxDQUFELENBQUosS0FBWSxHQUFiLEdBQW9CLENBQXBCLEdBQXdCLENBQXpDLENBekJzRCxDQXlCVjs7QUFDNUMsTUFBSVcsUUFBUSxHQUFHWCxJQUFJLENBQUNZLEtBQUwsQ0FBVyxHQUFYLENBQWYsQ0ExQnNELENBNEJ0RDs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBR0gsVUFBYixFQUF5QkcsQ0FBQyxHQUFHRixRQUFRLENBQUNHLE1BQXRDLEVBQThDRCxDQUFDLEVBQS9DLEVBQW1EO0FBQy9DLFFBQUlFLElBQUksR0FBR0osUUFBUSxDQUFDRSxDQUFELENBQW5CO0FBQ0EsUUFBSUcsUUFBUSxHQUFHUCxLQUFLLENBQUNRLFNBQXJCO0FBQ0FSLElBQUFBLEtBQUssR0FBRyxJQUFSOztBQUNBLFNBQUssSUFBSVMsQ0FBQyxHQUFHLENBQVIsRUFBV0MsR0FBRyxHQUFHSCxRQUFRLENBQUNGLE1BQS9CLEVBQXVDSSxDQUFDLEdBQUdDLEdBQTNDLEVBQWdELEVBQUVELENBQWxELEVBQXFEO0FBQ2pELFVBQUlFLFFBQVEsR0FBR0osUUFBUSxDQUFDRSxDQUFELENBQXZCOztBQUNBLFVBQUlFLFFBQVEsQ0FBQ0wsSUFBVCxLQUFrQkEsSUFBdEIsRUFBNEI7QUFDeEJOLFFBQUFBLEtBQUssR0FBR1csUUFBUjtBQUNBO0FBQ0g7QUFDSjs7QUFDRCxRQUFJLENBQUNYLEtBQUwsRUFBWTtBQUNSLGFBQU8sSUFBUDtBQUNIO0FBQ0o7O0FBRUQsU0FBT0EsS0FBUDtBQUNILENBOUNEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIEZpbmRzIGEgbm9kZSBieSBoaWVyYXJjaHkgcGF0aCwgdGhlIHBhdGggaXMgY2FzZS1zZW5zaXRpdmUuXHJcbiAqIEl0IHdpbGwgdHJhdmVyc2UgdGhlIGhpZXJhcmNoeSBieSBzcGxpdHRpbmcgdGhlIHBhdGggdXNpbmcgJy8nIGNoYXJhY3Rlci5cclxuICogVGhpcyBmdW5jdGlvbiB3aWxsIHN0aWxsIHJldHVybnMgdGhlIG5vZGUgZXZlbiBpZiBpdCBpcyBpbmFjdGl2ZS5cclxuICogSXQgaXMgcmVjb21tZW5kZWQgdG8gbm90IHVzZSB0aGlzIGZ1bmN0aW9uIGV2ZXJ5IGZyYW1lIGluc3RlYWQgY2FjaGUgdGhlIHJlc3VsdCBhdCBzdGFydHVwLlxyXG4gKlxyXG4gKiBAbWV0aG9kIGZpbmRcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxyXG4gKiBAcGFyYW0ge05vZGV9IFtyZWZlcmVuY2VOb2RlXVxyXG4gKiBAcmV0dXJuIHtOb2RlfG51bGx9IHRoZSBub2RlIG9yIG51bGwgaWYgbm90IGZvdW5kXHJcbiAqL1xyXG5jYy5maW5kID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGF0aCwgcmVmZXJlbmNlTm9kZSkge1xyXG4gICAgaWYgKHBhdGggPT0gbnVsbCkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoMzgxNCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoIXJlZmVyZW5jZU5vZGUpIHtcclxuICAgICAgICB2YXIgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xyXG4gICAgICAgIGlmICghc2NlbmUpIHtcclxuICAgICAgICAgICAgaWYgKENDX0RFVikge1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDU2MDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChDQ19ERVYgJiYgIXNjZW5lLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDU2MDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVmZXJlbmNlTm9kZSA9IHNjZW5lO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoQ0NfREVWICYmICFyZWZlcmVuY2VOb2RlLmlzVmFsaWQpIHtcclxuICAgICAgICBjYy53YXJuSUQoNTYwMyk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1hdGNoID0gcmVmZXJlbmNlTm9kZTtcclxuICAgIHZhciBzdGFydEluZGV4ID0gKHBhdGhbMF0gIT09ICcvJykgPyAwIDogMTsgLy8gc2tpcCBmaXJzdCAnLydcclxuICAgIHZhciBuYW1lTGlzdCA9IHBhdGguc3BsaXQoJy8nKTtcclxuXHJcbiAgICAvLyBwYXJzZSBwYXRoXHJcbiAgICBmb3IgKHZhciBuID0gc3RhcnRJbmRleDsgbiA8IG5hbWVMaXN0Lmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBuYW1lTGlzdFtuXTtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBtYXRjaC5fY2hpbGRyZW47XHJcbiAgICAgICAgbWF0Y2ggPSBudWxsO1xyXG4gICAgICAgIGZvciAodmFyIHQgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IHQgPCBsZW47ICsrdCkge1xyXG4gICAgICAgICAgICB2YXIgc3ViQ2hpbGQgPSBjaGlsZHJlblt0XTtcclxuICAgICAgICAgICAgaWYgKHN1YkNoaWxkLm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gc3ViQ2hpbGQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW1hdGNoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWF0Y2g7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9