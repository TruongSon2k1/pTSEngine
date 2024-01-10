
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var utils = _interopRequireWildcard(require("./utils"));

var _box = _interopRequireDefault(require("./box"));

var _cone = _interopRequireDefault(require("./cone"));

var _cylinder = _interopRequireDefault(require("./cylinder"));

var _plane = _interopRequireDefault(require("./plane"));

var _quad = _interopRequireDefault(require("./quad"));

var _sphere = _interopRequireDefault(require("./sphere"));

var _torus = _interopRequireDefault(require("./torus"));

var _capsule = _interopRequireDefault(require("./capsule"));

var _polyhedron = require("./polyhedron");

var _vertexData = _interopRequireDefault(require("./vertex-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * !#en A basic module for creating vertex data for 3D objects. You can access this module by `cc.primitive`.
 * !#zh 一个创建 3D 物体顶点数据的基础模块，你可以通过 `cc.primitive` 来访问这个模块。
 * @module cc.primitive
 * @submodule cc.primitive
 * @main
 */
cc.primitive = Object.assign({
  /**
   * !#en Create box vertex data
   * !#zh 创建长方体顶点数据
   * @method box
   * @static
   * @param {Number} width
   * @param {Number} height
   * @param {Number} length
   * @param {Object} opts
   * @param {Number} opts.widthSegments
   * @param {Number} opts.heightSegments
   * @param {Number} opts.lengthSegments
   * @return {primitive.VertexData}
   */
  box: _box["default"],

  /**
   * !#en Create cone vertex data
   * !#zh 创建圆锥体顶点数据
   * @method cone
   * @static
   * @param {Number} radius
   * @param {Number} height
   * @param {Object} opts
   * @param {Number} opts.radialSegments
   * @param {Number} opts.heightSegments
   * @param {Boolean} opts.capped
   * @param {Number} opts.arc
   * @return {primitive.VertexData}
   */
  cone: _cone["default"],

  /**
   * !#en Create cylinder vertex data
   * !#zh 创建圆柱体顶点数据
   * @method cylinder
   * @static
   * @param {Number} radiusTop
   * @param {Number} radiusBottom
   * @param {Number} height
   * @param {Object} opts
   * @param {Number} opts.radialSegments
   * @param {Number} opts.heightSegments
   * @param {Boolean} opts.capped
   * @param {Number} opts.arc
   * @return {primitive.VertexData}
   */
  cylinder: _cylinder["default"],

  /**
   * !#en Create plane vertex data
   * !#zh 创建平台顶点数据
   * @method plane
   * @static
   * @param {Number} width
   * @param {Number} length
   * @param {Object} opts
   * @param {Number} opts.widthSegments
   * @param {Number} opts.lengthSegments
   * @return {primitive.VertexData}
   */
  plane: _plane["default"],

  /**
   * !#en Create quad vertex data
   * !#zh 创建面片顶点数据
   * @method quad
   * @static
   * @return {primitive.VertexData}
   */
  quad: _quad["default"],

  /**
   * !#en Create sphere vertex data
   * !#zh 创建球体顶点数据
   * @method sphere
   * @static
   * @param {Number} radius
   * @param {Object} opts
   * @param {Number} opts.segments
   * @return {primitive.VertexData}
   */
  sphere: _sphere["default"],

  /**
   * !#en Create torus vertex data
   * !#zh 创建圆环顶点数据
   * @method torus
   * @static
   * @param {Number} radius
   * @param {Number} tube
   * @param {Object} opts
   * @param {Number} opts.radialSegments
   * @param {Number} opts.tubularSegments
   * @param {Number} opts.arc
   * @return {primitive.VertexData}
   */
  torus: _torus["default"],

  /**
   * !#en Create capsule vertex data
   * !#zh 创建胶囊体顶点数据
   * @method capsule
   * @static
   * @param {Number} radiusTop
   * @param {Number} radiusBottom
   * @param {Number} height
   * @param {Object} opts
   * @param {Number} opts.sides
   * @param {Number} opts.heightSegments
   * @param {Boolean} opts.capped
   * @param {Number} opts.arc
   * @return {primitive.VertexData}
   */
  capsule: _capsule["default"],

  /**
   * !#en Create polyhedron vertex data
   * !#zh 创建多面体顶点数据
   * @method polyhedron
   * @static
   * @param {primitive.PolyhedronType} type
   * @param {Number} Size
   * @param {Object} opts
   * @param {Number} opts.sizeX
   * @param {Number} opts.sizeY
   * @param {Number} opts.sizeZ
   * @return {primitive.VertexData}
   */
  polyhedron: _polyhedron.polyhedron,
  PolyhedronType: _polyhedron.PolyhedronType,
  VertexData: _vertexData["default"]
}, utils); // fix submodule pollute ...

/**
 * @submodule cc
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwcmltaXRpdmVcXGluZGV4LnRzIl0sIm5hbWVzIjpbImNjIiwicHJpbWl0aXZlIiwiT2JqZWN0IiwiYXNzaWduIiwiYm94IiwiY29uZSIsImN5bGluZGVyIiwicGxhbmUiLCJxdWFkIiwic3BoZXJlIiwidG9ydXMiLCJjYXBzdWxlIiwicG9seWhlZHJvbiIsIlBvbHloZWRyb25UeXBlIiwiVmVydGV4RGF0YSIsInV0aWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxTQUFILEdBQWVDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQ3pCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsR0FBRyxFQUFIQSxlQWZ5Qjs7QUFnQnpCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsSUFBSSxFQUFKQSxnQkE5QnlCOztBQStCekI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFFBQVEsRUFBUkEsb0JBOUN5Qjs7QUErQ3pCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxLQUFLLEVBQUxBLGlCQTNEeUI7O0FBNER6QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxJQUFJLEVBQUpBLGdCQW5FeUI7O0FBb0V6QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxNQUFNLEVBQU5BLGtCQTlFeUI7O0FBK0V6QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxLQUFLLEVBQUxBLGlCQTVGeUI7O0FBNkZ6QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsT0FBTyxFQUFQQSxtQkE1R3lCOztBQTZHekI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsVUFBVSxFQUFWQSxzQkExSHlCO0FBNEh6QkMsRUFBQUEsY0FBYyxFQUFkQSwwQkE1SHlCO0FBNkh6QkMsRUFBQUEsVUFBVSxFQUFWQTtBQTdIeUIsQ0FBZCxFQThIWkMsS0E5SFksQ0FBZixFQWdJQTs7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IGJveCBmcm9tICcuL2JveCc7XHJcbmltcG9ydCBjb25lIGZyb20gJy4vY29uZSc7XHJcbmltcG9ydCBjeWxpbmRlciBmcm9tICcuL2N5bGluZGVyJztcclxuaW1wb3J0IHBsYW5lIGZyb20gJy4vcGxhbmUnO1xyXG5pbXBvcnQgcXVhZCBmcm9tICcuL3F1YWQnO1xyXG5pbXBvcnQgc3BoZXJlIGZyb20gJy4vc3BoZXJlJztcclxuaW1wb3J0IHRvcnVzIGZyb20gJy4vdG9ydXMnO1xyXG5pbXBvcnQgY2Fwc3VsZSBmcm9tICcuL2NhcHN1bGUnO1xyXG5pbXBvcnQgeyBQb2x5aGVkcm9uVHlwZSwgcG9seWhlZHJvbiB9IGZyb20gJy4vcG9seWhlZHJvbic7XHJcbmltcG9ydCBWZXJ0ZXhEYXRhIGZyb20gJy4vdmVydGV4LWRhdGEnO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gQSBiYXNpYyBtb2R1bGUgZm9yIGNyZWF0aW5nIHZlcnRleCBkYXRhIGZvciAzRCBvYmplY3RzLiBZb3UgY2FuIGFjY2VzcyB0aGlzIG1vZHVsZSBieSBgY2MucHJpbWl0aXZlYC5cclxuICogISN6aCDkuIDkuKrliJvlu7ogM0Qg54mp5L2T6aG254K55pWw5o2u55qE5Z+656GA5qih5Z2X77yM5L2g5Y+v5Lul6YCa6L+HIGBjYy5wcmltaXRpdmVgIOadpeiuv+mXrui/meS4quaooeWdl+OAglxyXG4gKiBAbW9kdWxlIGNjLnByaW1pdGl2ZVxyXG4gKiBAc3VibW9kdWxlIGNjLnByaW1pdGl2ZVxyXG4gKiBAbWFpblxyXG4gKi9cclxuXHJcbmNjLnByaW1pdGl2ZSA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENyZWF0ZSBib3ggdmVydGV4IGRhdGFcclxuICAgICAqICEjemgg5Yib5bu66ZW/5pa55L2T6aG254K55pWw5o2uXHJcbiAgICAgKiBAbWV0aG9kIGJveFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMud2lkdGhTZWdtZW50c1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMuaGVpZ2h0U2VnbWVudHNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmxlbmd0aFNlZ21lbnRzXHJcbiAgICAgKiBAcmV0dXJuIHtwcmltaXRpdmUuVmVydGV4RGF0YX1cclxuICAgICAqL1xyXG4gICAgYm94LFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENyZWF0ZSBjb25lIHZlcnRleCBkYXRhXHJcbiAgICAgKiAhI3poIOWIm+W7uuWchumUpeS9k+mhtueCueaVsOaNrlxyXG4gICAgICogQG1ldGhvZCBjb25lXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkaXVzXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMucmFkaWFsU2VnbWVudHNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmhlaWdodFNlZ21lbnRzXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMuY2FwcGVkXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5hcmNcclxuICAgICAqIEByZXR1cm4ge3ByaW1pdGl2ZS5WZXJ0ZXhEYXRhfVxyXG4gICAgICovXHJcbiAgICBjb25lLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENyZWF0ZSBjeWxpbmRlciB2ZXJ0ZXggZGF0YVxyXG4gICAgICogISN6aCDliJvlu7rlnIbmn7HkvZPpobbngrnmlbDmja5cclxuICAgICAqIEBtZXRob2QgY3lsaW5kZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNUb3BcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNCb3R0b21cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5yYWRpYWxTZWdtZW50c1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMuaGVpZ2h0U2VnbWVudHNcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5jYXBwZWRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmFyY1xyXG4gICAgICogQHJldHVybiB7cHJpbWl0aXZlLlZlcnRleERhdGF9XHJcbiAgICAgKi9cclxuICAgIGN5bGluZGVyLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENyZWF0ZSBwbGFuZSB2ZXJ0ZXggZGF0YVxyXG4gICAgICogISN6aCDliJvlu7rlubPlj7DpobbngrnmlbDmja5cclxuICAgICAqIEBtZXRob2QgcGxhbmVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLndpZHRoU2VnbWVudHNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmxlbmd0aFNlZ21lbnRzXHJcbiAgICAgKiBAcmV0dXJuIHtwcmltaXRpdmUuVmVydGV4RGF0YX1cclxuICAgICAqL1xyXG4gICAgcGxhbmUsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ3JlYXRlIHF1YWQgdmVydGV4IGRhdGFcclxuICAgICAqICEjemgg5Yib5bu66Z2i54mH6aG254K55pWw5o2uXHJcbiAgICAgKiBAbWV0aG9kIHF1YWRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm4ge3ByaW1pdGl2ZS5WZXJ0ZXhEYXRhfVxyXG4gICAgICovXHJcbiAgICBxdWFkLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENyZWF0ZSBzcGhlcmUgdmVydGV4IGRhdGFcclxuICAgICAqICEjemgg5Yib5bu655CD5L2T6aG254K55pWw5o2uXHJcbiAgICAgKiBAbWV0aG9kIHNwaGVyZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZGl1c1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnNlZ21lbnRzXHJcbiAgICAgKiBAcmV0dXJuIHtwcmltaXRpdmUuVmVydGV4RGF0YX1cclxuICAgICAqL1xyXG4gICAgc3BoZXJlLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENyZWF0ZSB0b3J1cyB2ZXJ0ZXggZGF0YVxyXG4gICAgICogISN6aCDliJvlu7rlnIbnjq/pobbngrnmlbDmja5cclxuICAgICAqIEBtZXRob2QgdG9ydXNcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0dWJlXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMucmFkaWFsU2VnbWVudHNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnR1YnVsYXJTZWdtZW50c1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMuYXJjXHJcbiAgICAgKiBAcmV0dXJuIHtwcmltaXRpdmUuVmVydGV4RGF0YX1cclxuICAgICAqL1xyXG4gICAgdG9ydXMsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ3JlYXRlIGNhcHN1bGUgdmVydGV4IGRhdGFcclxuICAgICAqICEjemgg5Yib5bu66IO25ZuK5L2T6aG254K55pWw5o2uXHJcbiAgICAgKiBAbWV0aG9kIGNhcHN1bGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNUb3BcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNCb3R0b21cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5zaWRlc1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMuaGVpZ2h0U2VnbWVudHNcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5jYXBwZWRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmFyY1xyXG4gICAgICogQHJldHVybiB7cHJpbWl0aXZlLlZlcnRleERhdGF9XHJcbiAgICAgKi9cclxuICAgIGNhcHN1bGUsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ3JlYXRlIHBvbHloZWRyb24gdmVydGV4IGRhdGFcclxuICAgICAqICEjemgg5Yib5bu65aSa6Z2i5L2T6aG254K55pWw5o2uXHJcbiAgICAgKiBAbWV0aG9kIHBvbHloZWRyb25cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7cHJpbWl0aXZlLlBvbHloZWRyb25UeXBlfSB0eXBlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gU2l6ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnNpemVYXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5zaXplWVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMuc2l6ZVpcclxuICAgICAqIEByZXR1cm4ge3ByaW1pdGl2ZS5WZXJ0ZXhEYXRhfVxyXG4gICAgICovXHJcbiAgICBwb2x5aGVkcm9uLFxyXG5cclxuICAgIFBvbHloZWRyb25UeXBlLFxyXG4gICAgVmVydGV4RGF0YSxcclxufSwgdXRpbHMpO1xyXG5cclxuLy8gZml4IHN1Ym1vZHVsZSBwb2xsdXRlIC4uLlxyXG4vKipcclxuICogQHN1Ym1vZHVsZSBjY1xyXG4gKi9cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=