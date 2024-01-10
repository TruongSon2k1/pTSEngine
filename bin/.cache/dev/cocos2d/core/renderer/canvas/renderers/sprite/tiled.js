
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/sprite/tiled.js';
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var utils = require('../utils');

var CanvasTiledSprite = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(CanvasTiledSprite, _Assembler);

  function CanvasTiledSprite() {
    return _Assembler.apply(this, arguments) || this;
  }

  var _proto = CanvasTiledSprite.prototype;

  _proto.draw = function draw(ctx, sprite) {
    var node = sprite.node; // Transform

    var matrix = node._worldMatrix;
    var matrixm = matrix.m;
    var a = matrixm[0],
        b = matrixm[1],
        c = matrixm[4],
        d = matrixm[5],
        tx = matrixm[12],
        ty = matrixm[13];
    ctx.transform(a, b, c, d, tx, ty);
    ctx.scale(1, -1); // TODO: handle blend function
    // opacity

    utils.context.setGlobalAlpha(ctx, node.opacity / 255);
    var frame = sprite.spriteFrame;
    var rect = frame._rect;
    var tex = frame._texture;
    var sx = rect.x;
    var sy = rect.y;
    var sw = frame._rotated ? rect.height : rect.width;
    var sh = frame._rotated ? rect.width : rect.height;
    var image = utils.getFrameCache(tex, node._color, sx, sy, sw, sh);
    var w = node.width,
        h = node.height,
        x = -node.anchorX * w,
        y = -node.anchorY * h;
    y = -y - h;
    ctx.translate(x, y);
    ctx.fillStyle = ctx.createPattern(image, 'repeat');
    ctx.fillRect(0, 0, w, h);
    return 1;
  };

  return CanvasTiledSprite;
}(_assembler["default"]);

exports["default"] = CanvasTiledSprite;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxjYW52YXNcXHJlbmRlcmVyc1xcc3ByaXRlXFx0aWxlZC5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJDYW52YXNUaWxlZFNwcml0ZSIsImRyYXciLCJjdHgiLCJzcHJpdGUiLCJub2RlIiwibWF0cml4IiwiX3dvcmxkTWF0cml4IiwibWF0cml4bSIsIm0iLCJhIiwiYiIsImMiLCJkIiwidHgiLCJ0eSIsInRyYW5zZm9ybSIsInNjYWxlIiwiY29udGV4dCIsInNldEdsb2JhbEFscGhhIiwib3BhY2l0eSIsImZyYW1lIiwic3ByaXRlRnJhbWUiLCJyZWN0IiwiX3JlY3QiLCJ0ZXgiLCJfdGV4dHVyZSIsInN4IiwieCIsInN5IiwieSIsInN3IiwiX3JvdGF0ZWQiLCJoZWlnaHQiLCJ3aWR0aCIsInNoIiwiaW1hZ2UiLCJnZXRGcmFtZUNhY2hlIiwiX2NvbG9yIiwidyIsImgiLCJhbmNob3JYIiwiYW5jaG9yWSIsInRyYW5zbGF0ZSIsImZpbGxTdHlsZSIsImNyZWF0ZVBhdHRlcm4iLCJmaWxsUmVjdCIsIkFzc2VtYmxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXJCOztJQUVxQkM7Ozs7Ozs7OztTQUNqQkMsT0FBQSxjQUFNQyxHQUFOLEVBQVdDLE1BQVgsRUFBbUI7QUFDZixRQUFJQyxJQUFJLEdBQUdELE1BQU0sQ0FBQ0MsSUFBbEIsQ0FEZSxDQUVmOztBQUNBLFFBQUlDLE1BQU0sR0FBR0QsSUFBSSxDQUFDRSxZQUFsQjtBQUNBLFFBQUlDLE9BQU8sR0FBR0YsTUFBTSxDQUFDRyxDQUFyQjtBQUNBLFFBQUlDLENBQUMsR0FBR0YsT0FBTyxDQUFDLENBQUQsQ0FBZjtBQUFBLFFBQW9CRyxDQUFDLEdBQUdILE9BQU8sQ0FBQyxDQUFELENBQS9CO0FBQUEsUUFBb0NJLENBQUMsR0FBR0osT0FBTyxDQUFDLENBQUQsQ0FBL0M7QUFBQSxRQUFvREssQ0FBQyxHQUFHTCxPQUFPLENBQUMsQ0FBRCxDQUEvRDtBQUFBLFFBQ0lNLEVBQUUsR0FBR04sT0FBTyxDQUFDLEVBQUQsQ0FEaEI7QUFBQSxRQUNzQk8sRUFBRSxHQUFHUCxPQUFPLENBQUMsRUFBRCxDQURsQztBQUVBTCxJQUFBQSxHQUFHLENBQUNhLFNBQUosQ0FBY04sQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0JDLENBQXBCLEVBQXVCQyxDQUF2QixFQUEwQkMsRUFBMUIsRUFBOEJDLEVBQTlCO0FBQ0FaLElBQUFBLEdBQUcsQ0FBQ2MsS0FBSixDQUFVLENBQVYsRUFBYSxDQUFDLENBQWQsRUFSZSxDQVVmO0FBRUE7O0FBQ0FsQixJQUFBQSxLQUFLLENBQUNtQixPQUFOLENBQWNDLGNBQWQsQ0FBNkJoQixHQUE3QixFQUFrQ0UsSUFBSSxDQUFDZSxPQUFMLEdBQWUsR0FBakQ7QUFFQSxRQUFJQyxLQUFLLEdBQUdqQixNQUFNLENBQUNrQixXQUFuQjtBQUNBLFFBQUlDLElBQUksR0FBR0YsS0FBSyxDQUFDRyxLQUFqQjtBQUNBLFFBQUlDLEdBQUcsR0FBR0osS0FBSyxDQUFDSyxRQUFoQjtBQUNBLFFBQUlDLEVBQUUsR0FBR0osSUFBSSxDQUFDSyxDQUFkO0FBQ0EsUUFBSUMsRUFBRSxHQUFHTixJQUFJLENBQUNPLENBQWQ7QUFDQSxRQUFJQyxFQUFFLEdBQUdWLEtBQUssQ0FBQ1csUUFBTixHQUFpQlQsSUFBSSxDQUFDVSxNQUF0QixHQUErQlYsSUFBSSxDQUFDVyxLQUE3QztBQUNBLFFBQUlDLEVBQUUsR0FBR2QsS0FBSyxDQUFDVyxRQUFOLEdBQWlCVCxJQUFJLENBQUNXLEtBQXRCLEdBQThCWCxJQUFJLENBQUNVLE1BQTVDO0FBRUEsUUFBSUcsS0FBSyxHQUFHckMsS0FBSyxDQUFDc0MsYUFBTixDQUFvQlosR0FBcEIsRUFBeUJwQixJQUFJLENBQUNpQyxNQUE5QixFQUFzQ1gsRUFBdEMsRUFBMENFLEVBQTFDLEVBQThDRSxFQUE5QyxFQUFrREksRUFBbEQsQ0FBWjtBQUVBLFFBQUlJLENBQUMsR0FBR2xDLElBQUksQ0FBQzZCLEtBQWI7QUFBQSxRQUNJTSxDQUFDLEdBQUduQyxJQUFJLENBQUM0QixNQURiO0FBQUEsUUFFSUwsQ0FBQyxHQUFHLENBQUN2QixJQUFJLENBQUNvQyxPQUFOLEdBQWdCRixDQUZ4QjtBQUFBLFFBR0lULENBQUMsR0FBRyxDQUFDekIsSUFBSSxDQUFDcUMsT0FBTixHQUFnQkYsQ0FIeEI7QUFJQVYsSUFBQUEsQ0FBQyxHQUFHLENBQUVBLENBQUYsR0FBTVUsQ0FBVjtBQUVBckMsSUFBQUEsR0FBRyxDQUFDd0MsU0FBSixDQUFjZixDQUFkLEVBQWlCRSxDQUFqQjtBQUNBM0IsSUFBQUEsR0FBRyxDQUFDeUMsU0FBSixHQUFnQnpDLEdBQUcsQ0FBQzBDLGFBQUosQ0FBa0JULEtBQWxCLEVBQXlCLFFBQXpCLENBQWhCO0FBQ0FqQyxJQUFBQSxHQUFHLENBQUMyQyxRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQlAsQ0FBbkIsRUFBc0JDLENBQXRCO0FBQ0EsV0FBTyxDQUFQO0FBQ0g7OztFQXBDMENPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IEFzc2VtYmxlciBmcm9tICcuLi8uLi8uLi9hc3NlbWJsZXInO1xyXG5cclxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzVGlsZWRTcHJpdGUgZXh0ZW5kcyBBc3NlbWJsZXIge1xyXG4gICAgZHJhdyAoY3R4LCBzcHJpdGUpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IHNwcml0ZS5ub2RlO1xyXG4gICAgICAgIC8vIFRyYW5zZm9ybVxyXG4gICAgICAgIGxldCBtYXRyaXggPSBub2RlLl93b3JsZE1hdHJpeDtcclxuICAgICAgICBsZXQgbWF0cml4bSA9IG1hdHJpeC5tO1xyXG4gICAgICAgIGxldCBhID0gbWF0cml4bVswXSwgYiA9IG1hdHJpeG1bMV0sIGMgPSBtYXRyaXhtWzRdLCBkID0gbWF0cml4bVs1XSxcclxuICAgICAgICAgICAgdHggPSBtYXRyaXhtWzEyXSwgdHkgPSBtYXRyaXhtWzEzXTtcclxuICAgICAgICBjdHgudHJhbnNmb3JtKGEsIGIsIGMsIGQsIHR4LCB0eSk7XHJcbiAgICAgICAgY3R4LnNjYWxlKDEsIC0xKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogaGFuZGxlIGJsZW5kIGZ1bmN0aW9uXHJcblxyXG4gICAgICAgIC8vIG9wYWNpdHlcclxuICAgICAgICB1dGlscy5jb250ZXh0LnNldEdsb2JhbEFscGhhKGN0eCwgbm9kZS5vcGFjaXR5IC8gMjU1KTtcclxuXHJcbiAgICAgICAgbGV0IGZyYW1lID0gc3ByaXRlLnNwcml0ZUZyYW1lO1xyXG4gICAgICAgIGxldCByZWN0ID0gZnJhbWUuX3JlY3Q7XHJcbiAgICAgICAgbGV0IHRleCA9IGZyYW1lLl90ZXh0dXJlO1xyXG4gICAgICAgIGxldCBzeCA9IHJlY3QueDtcclxuICAgICAgICBsZXQgc3kgPSByZWN0Lnk7XHJcbiAgICAgICAgbGV0IHN3ID0gZnJhbWUuX3JvdGF0ZWQgPyByZWN0LmhlaWdodCA6IHJlY3Qud2lkdGg7XHJcbiAgICAgICAgbGV0IHNoID0gZnJhbWUuX3JvdGF0ZWQgPyByZWN0LndpZHRoIDogcmVjdC5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGxldCBpbWFnZSA9IHV0aWxzLmdldEZyYW1lQ2FjaGUodGV4LCBub2RlLl9jb2xvciwgc3gsIHN5LCBzdywgc2gpO1xyXG5cclxuICAgICAgICBsZXQgdyA9IG5vZGUud2lkdGgsXHJcbiAgICAgICAgICAgIGggPSBub2RlLmhlaWdodCxcclxuICAgICAgICAgICAgeCA9IC1ub2RlLmFuY2hvclggKiB3LFxyXG4gICAgICAgICAgICB5ID0gLW5vZGUuYW5jaG9yWSAqIGg7XHJcbiAgICAgICAgeSA9IC0geSAtIGg7XHJcblxyXG4gICAgICAgIGN0eC50cmFuc2xhdGUoeCwgeSk7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGN0eC5jcmVhdGVQYXR0ZXJuKGltYWdlLCAncmVwZWF0Jyk7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHcsIGgpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9