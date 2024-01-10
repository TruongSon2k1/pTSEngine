
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/vertex-data.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/**
 * @class primitive.VertexData
 * @param {number[]} positions 
 * @param {number[]} normals 
 * @param {number[]} uvs 
 * @param {number[]} indices 
 * @param {Vec3} minPos 
 * @param {Vec3} maxPos 
 * @param {number} boundingRadius 
 */
var VertexData =
/**
 * @property {number[]} positions
 */

/**
 * @property {number[]} normals
 */

/**
 * @property {number[]} uvs
 */

/**
 * @property {[Number]} indices
 */

/**
 * @property {Vec3} minPos
 */

/**
 * @property {Vec3} maxPos
 */

/**
 * @property {number} boundingRadius
 */
function VertexData(positions, normals, uvs, indices, minPos, maxPos, boundingRadius) {
  this.positions = void 0;
  this.normals = void 0;
  this.uvs = void 0;
  this.indices = void 0;
  this.minPos = void 0;
  this.maxPos = void 0;
  this.boundingRadius = void 0;
  this.positions = positions;
  this.normals = normals;
  this.uvs = uvs;
  this.indices = indices;
  this.minPos = minPos;
  this.maxPos = maxPos;
  this.boundingRadius = boundingRadius;
};

exports["default"] = VertexData;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwcmltaXRpdmVcXHZlcnRleC1kYXRhLnRzIl0sIm5hbWVzIjpbIlZlcnRleERhdGEiLCJwb3NpdGlvbnMiLCJub3JtYWxzIiwidXZzIiwiaW5kaWNlcyIsIm1pblBvcyIsIm1heFBvcyIsImJvdW5kaW5nUmFkaXVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBO0FBQ2pCO0FBQ0o7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7O0FBRUk7QUFDSjtBQUNBOztBQUVJO0FBQ0o7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7O0FBRUk7QUFDSjtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUdJLG9CQUFZQyxTQUFaLEVBQWlDQyxPQUFqQyxFQUFvREMsR0FBcEQsRUFBbUVDLE9BQW5FLEVBQXNGQyxNQUF0RixFQUFvR0MsTUFBcEcsRUFBa0hDLGNBQWxILEVBQTBJO0FBQUEsT0ExQjFJTixTQTBCMEk7QUFBQSxPQXRCMUlDLE9Bc0IwSTtBQUFBLE9BbEIxSUMsR0FrQjBJO0FBQUEsT0FkMUlDLE9BYzBJO0FBQUEsT0FWMUlDLE1BVTBJO0FBQUEsT0FOMUlDLE1BTTBJO0FBQUEsT0FGMUlDLGNBRTBJO0FBQ3RJLE9BQUtOLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsT0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsT0FBS0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsT0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsT0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsT0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsT0FBS0MsY0FBTCxHQUFzQkEsY0FBdEI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWZWMzIGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBwcmltaXRpdmUuVmVydGV4RGF0YVxyXG4gKiBAcGFyYW0ge251bWJlcltdfSBwb3NpdGlvbnMgXHJcbiAqIEBwYXJhbSB7bnVtYmVyW119IG5vcm1hbHMgXHJcbiAqIEBwYXJhbSB7bnVtYmVyW119IHV2cyBcclxuICogQHBhcmFtIHtudW1iZXJbXX0gaW5kaWNlcyBcclxuICogQHBhcmFtIHtWZWMzfSBtaW5Qb3MgXHJcbiAqIEBwYXJhbSB7VmVjM30gbWF4UG9zIFxyXG4gKiBAcGFyYW0ge251bWJlcn0gYm91bmRpbmdSYWRpdXMgXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJ0ZXhEYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJbXX0gcG9zaXRpb25zXHJcbiAgICAgKi9cclxuICAgIHBvc2l0aW9uczogbnVtYmVyW107XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyW119IG5vcm1hbHNcclxuICAgICAqL1xyXG4gICAgbm9ybWFsczogbnVtYmVyW107XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyW119IHV2c1xyXG4gICAgICovXHJcbiAgICB1dnM6IG51bWJlcltdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge1tOdW1iZXJdfSBpbmRpY2VzXHJcbiAgICAgKi9cclxuICAgIGluZGljZXM6IG51bWJlcltdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IG1pblBvc1xyXG4gICAgICovXHJcbiAgICBtaW5Qb3M6IFZlYzM7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gbWF4UG9zXHJcbiAgICAgKi9cclxuICAgIG1heFBvczogVmVjMztcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJvdW5kaW5nUmFkaXVzXHJcbiAgICAgKi9cclxuICAgIGJvdW5kaW5nUmFkaXVzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb25zOiBudW1iZXJbXSwgbm9ybWFsczogbnVtYmVyW10sIHV2czogbnVtYmVyW10sIGluZGljZXM6IG51bWJlcltdLCBtaW5Qb3M6IFZlYzMsIG1heFBvczogVmVjMywgYm91bmRpbmdSYWRpdXM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25zID0gcG9zaXRpb25zO1xyXG4gICAgICAgIHRoaXMubm9ybWFscyA9IG5vcm1hbHM7XHJcbiAgICAgICAgdGhpcy51dnMgPSB1dnM7XHJcbiAgICAgICAgdGhpcy5pbmRpY2VzID0gaW5kaWNlcztcclxuICAgICAgICB0aGlzLm1pblBvcyA9IG1pblBvcztcclxuICAgICAgICB0aGlzLm1heFBvcyA9IG1heFBvcztcclxuICAgICAgICB0aGlzLmJvdW5kaW5nUmFkaXVzID0gYm91bmRpbmdSYWRpdXM7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=