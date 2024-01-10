
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/graphics/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _impl = _interopRequireDefault(require("./impl"));

var _graphics = _interopRequireDefault(require("../../../../graphics/graphics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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
var CanvasGraphicsAssembler = /*#__PURE__*/function () {
  function CanvasGraphicsAssembler() {}

  var _proto = CanvasGraphicsAssembler.prototype;

  _proto.init = function init() {};

  _proto.updateRenderData = function updateRenderData() {};

  _proto.draw = function draw(ctx, comp) {
    var node = comp.node; // Transform

    var matrix = node._worldMatrix;
    var matrixm = matrix.m;
    var a = matrixm[0],
        b = matrixm[1],
        c = matrixm[4],
        d = matrixm[5],
        tx = matrixm[12],
        ty = matrixm[13];
    ctx.transform(a, b, c, d, tx, ty);
    ctx.save(); // TODO: handle blend function
    // opacity

    ctx.globalAlpha = node.opacity / 255;
    var style = comp._impl.style;
    ctx.strokeStyle = style.strokeStyle;
    ctx.fillStyle = style.fillStyle;
    ctx.lineWidth = style.lineWidth;
    ctx.lineJoin = style.lineJoin;
    ctx.miterLimit = style.miterLimit;
    var endPath = true;
    var cmds = comp._impl.cmds;

    for (var i = 0, l = cmds.length; i < l; i++) {
      var cmd = cmds[i];
      var ctxCmd = cmd[0],
          args = cmd[1];

      if (ctxCmd === 'moveTo' && endPath) {
        ctx.beginPath();
        endPath = false;
      } else if (ctxCmd === 'fill' || ctxCmd === 'stroke' || ctxCmd === 'fillRect') {
        endPath = true;
      }

      if (typeof ctx[ctxCmd] === 'function') {
        ctx[ctxCmd].apply(ctx, args);
      } else {
        ctx[ctxCmd] = args;
      }
    }

    ctx.restore();
    return 1;
  };

  _proto.stroke = function stroke(comp) {
    comp._impl.stroke();
  };

  _proto.fill = function fill(comp) {
    comp._impl.fill();
  };

  _proto.clear = function clear() {};

  return CanvasGraphicsAssembler;
}();

exports["default"] = CanvasGraphicsAssembler;

_assembler["default"].register(_graphics["default"], CanvasGraphicsAssembler);

module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxjYW52YXNcXHJlbmRlcmVyc1xcZ3JhcGhpY3NcXGluZGV4LmpzIl0sIm5hbWVzIjpbIkNhbnZhc0dyYXBoaWNzQXNzZW1ibGVyIiwiaW5pdCIsInVwZGF0ZVJlbmRlckRhdGEiLCJkcmF3IiwiY3R4IiwiY29tcCIsIm5vZGUiLCJtYXRyaXgiLCJfd29ybGRNYXRyaXgiLCJtYXRyaXhtIiwibSIsImEiLCJiIiwiYyIsImQiLCJ0eCIsInR5IiwidHJhbnNmb3JtIiwic2F2ZSIsImdsb2JhbEFscGhhIiwib3BhY2l0eSIsInN0eWxlIiwiX2ltcGwiLCJzdHJva2VTdHlsZSIsImZpbGxTdHlsZSIsImxpbmVXaWR0aCIsImxpbmVKb2luIiwibWl0ZXJMaW1pdCIsImVuZFBhdGgiLCJjbWRzIiwiaSIsImwiLCJsZW5ndGgiLCJjbWQiLCJjdHhDbWQiLCJhcmdzIiwiYmVnaW5QYXRoIiwiYXBwbHkiLCJyZXN0b3JlIiwic3Ryb2tlIiwiZmlsbCIsImNsZWFyIiwiQXNzZW1ibGVyIiwicmVnaXN0ZXIiLCJHcmFwaGljcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQTs7QUFDQTs7QUFDQTs7OztBQTFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFLcUJBOzs7OztTQUNqQkMsT0FBQSxnQkFBUSxDQUFFOztTQUVWQyxtQkFBQSw0QkFBb0IsQ0FBRTs7U0FFdEJDLE9BQUEsY0FBTUMsR0FBTixFQUFXQyxJQUFYLEVBQWlCO0FBQ2IsUUFBSUMsSUFBSSxHQUFHRCxJQUFJLENBQUNDLElBQWhCLENBRGEsQ0FFYjs7QUFDQSxRQUFJQyxNQUFNLEdBQUdELElBQUksQ0FBQ0UsWUFBbEI7QUFDQSxRQUFJQyxPQUFPLEdBQUdG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QkFBVUMsUUFBVixDQUFtQkMsb0JBQW5CLEVBQTZCNUMsdUJBQTdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pbXBvcnQgQXNzZW1ibGVyIGZyb20gJy4uLy4uLy4uL2Fzc2VtYmxlcic7XHJcbmltcG9ydCBJbXBsIGZyb20gJy4vaW1wbCc7XHJcbmltcG9ydCBHcmFwaGljcyBmcm9tICcuLi8uLi8uLi8uLi9ncmFwaGljcy9ncmFwaGljcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNHcmFwaGljc0Fzc2VtYmxlciB7XHJcbiAgICBpbml0ICgpIHt9XHJcblxyXG4gICAgdXBkYXRlUmVuZGVyRGF0YSAoKSB7fVxyXG5cclxuICAgIGRyYXcgKGN0eCwgY29tcCkge1xyXG4gICAgICAgIGxldCBub2RlID0gY29tcC5ub2RlO1xyXG4gICAgICAgIC8vIFRyYW5zZm9ybVxyXG4gICAgICAgIGxldCBtYXRyaXggPSBub2RlLl93b3JsZE1hdHJpeDtcclxuICAgICAgICBsZXQgbWF0cml4bSA9IG1hdHJpeC5tO1xyXG4gICAgICAgIGxldCBhID0gbWF0cml4bVswXSwgYiA9IG1hdHJpeG1bMV0sIGMgPSBtYXRyaXhtWzRdLCBkID0gbWF0cml4bVs1XSxcclxuICAgICAgICAgICAgdHggPSBtYXRyaXhtWzEyXSwgdHkgPSBtYXRyaXhtWzEzXTtcclxuICAgICAgICBjdHgudHJhbnNmb3JtKGEsIGIsIGMsIGQsIHR4LCB0eSk7XHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogaGFuZGxlIGJsZW5kIGZ1bmN0aW9uXHJcblxyXG4gICAgICAgIC8vIG9wYWNpdHlcclxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSBub2RlLm9wYWNpdHkgLyAyNTU7XHJcblxyXG4gICAgICAgIGxldCBzdHlsZSA9IGNvbXAuX2ltcGwuc3R5bGU7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3R5bGUuc3Ryb2tlU3R5bGU7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0eWxlLmZpbGxTdHlsZTtcclxuICAgICAgICBjdHgubGluZVdpZHRoID0gc3R5bGUubGluZVdpZHRoO1xyXG4gICAgICAgIGN0eC5saW5lSm9pbiA9IHN0eWxlLmxpbmVKb2luO1xyXG4gICAgICAgIGN0eC5taXRlckxpbWl0ID0gc3R5bGUubWl0ZXJMaW1pdDtcclxuXHJcbiAgICAgICAgbGV0IGVuZFBhdGggPSB0cnVlO1xyXG4gICAgICAgIGxldCBjbWRzID0gY29tcC5faW1wbC5jbWRzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gY21kcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNtZCA9IGNtZHNbaV07XHJcbiAgICAgICAgICAgIGxldCBjdHhDbWQgPSBjbWRbMF0sIGFyZ3MgPSBjbWRbMV07XHJcblxyXG4gICAgICAgICAgICBpZiAoY3R4Q21kID09PSAnbW92ZVRvJyAmJiBlbmRQYXRoKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBlbmRQYXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY3R4Q21kID09PSAnZmlsbCcgfHwgY3R4Q21kID09PSAnc3Ryb2tlJyB8fCBjdHhDbWQgPT09ICdmaWxsUmVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGVuZFBhdGggPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN0eFtjdHhDbWRdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBjdHhbY3R4Q21kXS5hcHBseShjdHgsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3R4W2N0eENtZF0gPSBhcmdzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbiAgICBzdHJva2UgKGNvbXApIHtcclxuICAgICAgICBjb21wLl9pbXBsLnN0cm9rZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbGwgKGNvbXApIHtcclxuICAgICAgICBjb21wLl9pbXBsLmZpbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhciAoKSB7fVxyXG59XHJcblxyXG5Bc3NlbWJsZXIucmVnaXN0ZXIoR3JhcGhpY3MsIENhbnZhc0dyYXBoaWNzQXNzZW1ibGVyKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=