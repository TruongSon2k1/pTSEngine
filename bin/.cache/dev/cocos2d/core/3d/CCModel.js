
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/CCModel.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
var Model = cc.Class({
  name: 'cc.Model',
  "extends": cc.Asset,
  ctor: function ctor() {
    this._rootNode = null;
    this.loaded = false;
  },
  properties: {
    _nodes: {
      "default": []
    },
    _precomputeJointMatrix: false,
    nodes: {
      get: function get() {
        return this._nodes;
      }
    },
    rootNode: {
      get: function get() {
        return this._rootNode;
      }
    },
    precomputeJointMatrix: {
      get: function get() {
        return this._precomputeJointMatrix;
      }
    }
  },
  onLoad: function onLoad() {
    var nodes = this._nodes;
    this._rootNode = nodes[0];

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      node.position = cc.v3.apply(this, node.position);
      node.scale = cc.v3.apply(this, node.scale);
      node.quat = cc.quat.apply(this, node.quat);

      if (node.uniqueBindPose) {
        node.uniqueBindPose = cc.mat4.apply(this, node.uniqueBindPose);
      }

      var pose = node.bindpose;

      if (pose) {
        for (var _i in pose) {
          pose[_i] = cc.mat4.apply(this, pose[_i]);
        }
      }

      var children = node.children;

      if (children) {
        for (var _i2 = 0; _i2 < children.length; _i2++) {
          children[_i2] = nodes[children[_i2]];
        }
      }
    }
  }
});
cc.Model = module.exports = Model;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxDQ01vZGVsLmpzIl0sIm5hbWVzIjpbIk1vZGVsIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJBc3NldCIsImN0b3IiLCJfcm9vdE5vZGUiLCJsb2FkZWQiLCJwcm9wZXJ0aWVzIiwiX25vZGVzIiwiX3ByZWNvbXB1dGVKb2ludE1hdHJpeCIsIm5vZGVzIiwiZ2V0Iiwicm9vdE5vZGUiLCJwcmVjb21wdXRlSm9pbnRNYXRyaXgiLCJvbkxvYWQiLCJpIiwibGVuZ3RoIiwibm9kZSIsInBvc2l0aW9uIiwidjMiLCJhcHBseSIsInNjYWxlIiwicXVhdCIsInVuaXF1ZUJpbmRQb3NlIiwibWF0NCIsInBvc2UiLCJiaW5kcG9zZSIsImNoaWxkcmVuIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLEtBQUssR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDakJDLEVBQUFBLElBQUksRUFBRSxVQURXO0FBRWpCLGFBQVNGLEVBQUUsQ0FBQ0csS0FGSztBQUlqQkMsRUFBQUEsSUFKaUIsa0JBSVQ7QUFDSixTQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEtBQWQ7QUFDSCxHQVBnQjtBQVNqQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTO0FBREwsS0FEQTtBQUtSQyxJQUFBQSxzQkFBc0IsRUFBRSxLQUxoQjtBQU9SQyxJQUFBQSxLQUFLLEVBQUU7QUFDSEMsTUFBQUEsR0FERyxpQkFDSTtBQUNILGVBQU8sS0FBS0gsTUFBWjtBQUNIO0FBSEUsS0FQQztBQVlSSSxJQUFBQSxRQUFRLEVBQUU7QUFDTkQsTUFBQUEsR0FETSxpQkFDQztBQUNILGVBQU8sS0FBS04sU0FBWjtBQUNIO0FBSEssS0FaRjtBQWtCUlEsSUFBQUEscUJBQXFCLEVBQUU7QUFDbkJGLE1BQUFBLEdBRG1CLGlCQUNaO0FBQ0gsZUFBTyxLQUFLRixzQkFBWjtBQUNIO0FBSGtCO0FBbEJmLEdBVEs7QUFrQ2pCSyxFQUFBQSxNQWxDaUIsb0JBa0NQO0FBQ04sUUFBSUosS0FBSyxHQUFHLEtBQUtGLE1BQWpCO0FBQ0EsU0FBS0gsU0FBTCxHQUFpQkssS0FBSyxDQUFDLENBQUQsQ0FBdEI7O0FBQ0EsU0FBSyxJQUFJSyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHTCxLQUFLLENBQUNNLE1BQTFCLEVBQWtDRCxDQUFDLEVBQW5DLEVBQXVDO0FBQ25DLFVBQUlFLElBQUksR0FBR1AsS0FBSyxDQUFDSyxDQUFELENBQWhCO0FBQ0FFLE1BQUFBLElBQUksQ0FBQ0MsUUFBTCxHQUFnQmxCLEVBQUUsQ0FBQ21CLEVBQUgsQ0FBTUMsS0FBTixDQUFZLElBQVosRUFBa0JILElBQUksQ0FBQ0MsUUFBdkIsQ0FBaEI7QUFDQUQsTUFBQUEsSUFBSSxDQUFDSSxLQUFMLEdBQWFyQixFQUFFLENBQUNtQixFQUFILENBQU1DLEtBQU4sQ0FBWSxJQUFaLEVBQWtCSCxJQUFJLENBQUNJLEtBQXZCLENBQWI7QUFDQUosTUFBQUEsSUFBSSxDQUFDSyxJQUFMLEdBQVl0QixFQUFFLENBQUNzQixJQUFILENBQVFGLEtBQVIsQ0FBYyxJQUFkLEVBQW9CSCxJQUFJLENBQUNLLElBQXpCLENBQVo7O0FBRUEsVUFBSUwsSUFBSSxDQUFDTSxjQUFULEVBQXlCO0FBQ3JCTixRQUFBQSxJQUFJLENBQUNNLGNBQUwsR0FBc0J2QixFQUFFLENBQUN3QixJQUFILENBQVFKLEtBQVIsQ0FBYyxJQUFkLEVBQW9CSCxJQUFJLENBQUNNLGNBQXpCLENBQXRCO0FBQ0g7O0FBRUQsVUFBSUUsSUFBSSxHQUFHUixJQUFJLENBQUNTLFFBQWhCOztBQUNBLFVBQUlELElBQUosRUFBVTtBQUNOLGFBQUssSUFBSVYsRUFBVCxJQUFjVSxJQUFkLEVBQW9CO0FBQ2hCQSxVQUFBQSxJQUFJLENBQUNWLEVBQUQsQ0FBSixHQUFVZixFQUFFLENBQUN3QixJQUFILENBQVFKLEtBQVIsQ0FBYyxJQUFkLEVBQW9CSyxJQUFJLENBQUNWLEVBQUQsQ0FBeEIsQ0FBVjtBQUNIO0FBQ0o7O0FBRUQsVUFBSVksUUFBUSxHQUFHVixJQUFJLENBQUNVLFFBQXBCOztBQUNBLFVBQUlBLFFBQUosRUFBYztBQUNWLGFBQUssSUFBSVosR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR1ksUUFBUSxDQUFDWCxNQUE3QixFQUFxQ0QsR0FBQyxFQUF0QyxFQUEwQztBQUN0Q1ksVUFBQUEsUUFBUSxDQUFDWixHQUFELENBQVIsR0FBY0wsS0FBSyxDQUFDaUIsUUFBUSxDQUFDWixHQUFELENBQVQsQ0FBbkI7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQTdEZ0IsQ0FBVCxDQUFaO0FBZ0VBZixFQUFFLENBQUNELEtBQUgsR0FBVzZCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjlCLEtBQTVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHA6Ly93d3cuY29jb3MuY29tXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmxldCBNb2RlbCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Nb2RlbCcsXHJcbiAgICBleHRlbmRzOiBjYy5Bc3NldCxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9yb290Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9ub2Rlczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9wcmVjb21wdXRlSm9pbnRNYXRyaXg6IGZhbHNlLFxyXG5cclxuICAgICAgICBub2Rlczoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25vZGVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByb290Tm9kZToge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3ROb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJlY29tcHV0ZUpvaW50TWF0cml4OiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJlY29tcHV0ZUpvaW50TWF0cml4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGxldCBub2RlcyA9IHRoaXMuX25vZGVzO1xyXG4gICAgICAgIHRoaXMuX3Jvb3ROb2RlID0gbm9kZXNbMF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5vZGVzW2ldO1xyXG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY2MudjMuYXBwbHkodGhpcywgbm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBjYy52My5hcHBseSh0aGlzLCBub2RlLnNjYWxlKTtcclxuICAgICAgICAgICAgbm9kZS5xdWF0ID0gY2MucXVhdC5hcHBseSh0aGlzLCBub2RlLnF1YXQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKG5vZGUudW5pcXVlQmluZFBvc2UpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUudW5pcXVlQmluZFBvc2UgPSBjYy5tYXQ0LmFwcGx5KHRoaXMsIG5vZGUudW5pcXVlQmluZFBvc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcG9zZSA9IG5vZGUuYmluZHBvc2U7XHJcbiAgICAgICAgICAgIGlmIChwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHBvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NlW2ldID0gY2MubWF0NC5hcHBseSh0aGlzLCBwb3NlW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgaWYgKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5baV0gPSBub2Rlc1tjaGlsZHJlbltpXV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuTW9kZWwgPSBtb2R1bGUuZXhwb3J0cyA9IE1vZGVsO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==