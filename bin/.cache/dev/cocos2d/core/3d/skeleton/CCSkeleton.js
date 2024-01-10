
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/skeleton/CCSkeleton.js';
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
var Skeleton = cc.Class({
  name: 'cc.Skeleton',
  "extends": cc.Asset,
  ctor: function ctor() {
    this.loaded = false;
    this._bindposes = [];
    this._uniqueBindPoses = [];
    this._jointPaths = [];
  },
  properties: {
    _model: cc.Model,
    _jointIndices: [],
    _skinIndex: -1,
    jointPaths: {
      get: function get() {
        return this._jointPaths;
      }
    },
    bindposes: {
      get: function get() {
        return this._bindposes;
      }
    },
    uniqueBindPoses: {
      get: function get() {
        return this._uniqueBindPoses;
      }
    },
    model: {
      get: function get() {
        return this._model;
      }
    }
  },
  onLoad: function onLoad() {
    var nodes = this._model.nodes;
    var jointIndices = this._jointIndices;
    var jointPaths = this._jointPaths;
    var bindposes = this._bindposes;
    var uniqueBindPoses = this._uniqueBindPoses;

    for (var i = 0; i < jointIndices.length; i++) {
      var node = nodes[jointIndices[i]];
      jointPaths[i] = node.path;

      if (node.uniqueBindPose) {
        bindposes[i] = uniqueBindPoses[i] = node.uniqueBindPose;
      } else {
        bindposes[i] = node.bindpose[this._skinIndex];
      }
    }
  }
});
cc.Skeleton = module.exports = Skeleton;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxza2VsZXRvblxcQ0NTa2VsZXRvbi5qcyJdLCJuYW1lcyI6WyJTa2VsZXRvbiIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQXNzZXQiLCJjdG9yIiwibG9hZGVkIiwiX2JpbmRwb3NlcyIsIl91bmlxdWVCaW5kUG9zZXMiLCJfam9pbnRQYXRocyIsInByb3BlcnRpZXMiLCJfbW9kZWwiLCJNb2RlbCIsIl9qb2ludEluZGljZXMiLCJfc2tpbkluZGV4Iiwiam9pbnRQYXRocyIsImdldCIsImJpbmRwb3NlcyIsInVuaXF1ZUJpbmRQb3NlcyIsIm1vZGVsIiwib25Mb2FkIiwibm9kZXMiLCJqb2ludEluZGljZXMiLCJpIiwibGVuZ3RoIiwibm9kZSIsInBhdGgiLCJ1bmlxdWVCaW5kUG9zZSIsImJpbmRwb3NlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBLElBQUlBLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDcEJDLEVBQUFBLElBQUksRUFBRSxhQURjO0FBRXBCLGFBQVNGLEVBQUUsQ0FBQ0csS0FGUTtBQUlwQkMsRUFBQUEsSUFKb0Isa0JBSVo7QUFDSixTQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QixFQUF4QjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDSCxHQVRtQjtBQVdwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE1BQU0sRUFBRVYsRUFBRSxDQUFDVyxLQURIO0FBRVJDLElBQUFBLGFBQWEsRUFBRSxFQUZQO0FBR1JDLElBQUFBLFVBQVUsRUFBRSxDQUFDLENBSEw7QUFLUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JDLE1BQUFBLEdBRFEsaUJBQ0Q7QUFDSCxlQUFPLEtBQUtQLFdBQVo7QUFDSDtBQUhPLEtBTEo7QUFVUlEsSUFBQUEsU0FBUyxFQUFFO0FBQ1BELE1BQUFBLEdBRE8saUJBQ0E7QUFDSCxlQUFPLEtBQUtULFVBQVo7QUFDSDtBQUhNLEtBVkg7QUFlUlcsSUFBQUEsZUFBZSxFQUFFO0FBQ2JGLE1BQUFBLEdBRGEsaUJBQ047QUFDSCxlQUFPLEtBQUtSLGdCQUFaO0FBQ0g7QUFIWSxLQWZUO0FBb0JSVyxJQUFBQSxLQUFLLEVBQUU7QUFDSEgsTUFBQUEsR0FERyxpQkFDSTtBQUNILGVBQU8sS0FBS0wsTUFBWjtBQUNIO0FBSEU7QUFwQkMsR0FYUTtBQXNDcEJTLEVBQUFBLE1BdENvQixvQkFzQ1Y7QUFDTixRQUFJQyxLQUFLLEdBQUcsS0FBS1YsTUFBTCxDQUFZVSxLQUF4QjtBQUNBLFFBQUlDLFlBQVksR0FBRyxLQUFLVCxhQUF4QjtBQUNBLFFBQUlFLFVBQVUsR0FBRyxLQUFLTixXQUF0QjtBQUNBLFFBQUlRLFNBQVMsR0FBRyxLQUFLVixVQUFyQjtBQUNBLFFBQUlXLGVBQWUsR0FBRyxLQUFLVixnQkFBM0I7O0FBQ0EsU0FBSyxJQUFJZSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxZQUFZLENBQUNFLE1BQWpDLEVBQXlDRCxDQUFDLEVBQTFDLEVBQThDO0FBQzFDLFVBQUlFLElBQUksR0FBR0osS0FBSyxDQUFDQyxZQUFZLENBQUNDLENBQUQsQ0FBYixDQUFoQjtBQUNBUixNQUFBQSxVQUFVLENBQUNRLENBQUQsQ0FBVixHQUFnQkUsSUFBSSxDQUFDQyxJQUFyQjs7QUFDQSxVQUFJRCxJQUFJLENBQUNFLGNBQVQsRUFBeUI7QUFDckJWLFFBQUFBLFNBQVMsQ0FBQ00sQ0FBRCxDQUFULEdBQWVMLGVBQWUsQ0FBQ0ssQ0FBRCxDQUFmLEdBQXFCRSxJQUFJLENBQUNFLGNBQXpDO0FBQ0gsT0FGRCxNQUdLO0FBQ0RWLFFBQUFBLFNBQVMsQ0FBQ00sQ0FBRCxDQUFULEdBQWVFLElBQUksQ0FBQ0csUUFBTCxDQUFjLEtBQUtkLFVBQW5CLENBQWY7QUFDSDtBQUNKO0FBQ0o7QUF0RG1CLENBQVQsQ0FBZjtBQXlEQWIsRUFBRSxDQUFDRCxRQUFILEdBQWM2QixNQUFNLENBQUNDLE9BQVAsR0FBaUI5QixRQUEvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwOi8vd3d3LmNvY29zLmNvbVxyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxubGV0IFNrZWxldG9uID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlNrZWxldG9uJyxcclxuICAgIGV4dGVuZHM6IGNjLkFzc2V0LFxyXG5cclxuICAgIGN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmluZHBvc2VzID0gW107XHJcbiAgICAgICAgdGhpcy5fdW5pcXVlQmluZFBvc2VzID0gW107XHJcbiAgICAgICAgdGhpcy5fam9pbnRQYXRocyA9IFtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX21vZGVsOiBjYy5Nb2RlbCxcclxuICAgICAgICBfam9pbnRJbmRpY2VzOiBbXSxcclxuICAgICAgICBfc2tpbkluZGV4OiAtMSxcclxuXHJcbiAgICAgICAgam9pbnRQYXRoczoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pvaW50UGF0aHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRwb3Nlczoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRwb3NlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdW5pcXVlQmluZFBvc2VzOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdW5pcXVlQmluZFBvc2VzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb2RlbDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGxldCBub2RlcyA9IHRoaXMuX21vZGVsLm5vZGVzO1xyXG4gICAgICAgIGxldCBqb2ludEluZGljZXMgPSB0aGlzLl9qb2ludEluZGljZXM7XHJcbiAgICAgICAgbGV0IGpvaW50UGF0aHMgPSB0aGlzLl9qb2ludFBhdGhzO1xyXG4gICAgICAgIGxldCBiaW5kcG9zZXMgPSB0aGlzLl9iaW5kcG9zZXM7XHJcbiAgICAgICAgbGV0IHVuaXF1ZUJpbmRQb3NlcyA9IHRoaXMuX3VuaXF1ZUJpbmRQb3NlcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpvaW50SW5kaWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5vZGVzW2pvaW50SW5kaWNlc1tpXV07XHJcbiAgICAgICAgICAgIGpvaW50UGF0aHNbaV0gPSBub2RlLnBhdGg7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnVuaXF1ZUJpbmRQb3NlKSB7XHJcbiAgICAgICAgICAgICAgICBiaW5kcG9zZXNbaV0gPSB1bmlxdWVCaW5kUG9zZXNbaV0gPSBub2RlLnVuaXF1ZUJpbmRQb3NlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmluZHBvc2VzW2ldID0gbm9kZS5iaW5kcG9zZVt0aGlzLl9za2luSW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbmNjLlNrZWxldG9uID0gbW9kdWxlLmV4cG9ydHMgPSBTa2VsZXRvbjsiXSwic291cmNlUm9vdCI6Ii8ifQ==