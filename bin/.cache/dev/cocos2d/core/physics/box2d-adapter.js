
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/box2d-adapter.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var box2d = require('../../../external/box2d/box2d');

window.b2 = {};

for (var key in box2d) {
  if (key.indexOf('b2_') !== -1) {
    continue;
  }

  var newKey = key.replace('b2', '');
  b2[newKey] = box2d[key];
}

b2.maxPolygonVertices = 8;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGJveDJkLWFkYXB0ZXIuanMiXSwibmFtZXMiOlsiYm94MmQiLCJyZXF1aXJlIiwid2luZG93IiwiYjIiLCJrZXkiLCJpbmRleE9mIiwibmV3S2V5IiwicmVwbGFjZSIsIm1heFBvbHlnb25WZXJ0aWNlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLEtBQUssR0FBR0MsT0FBTyxDQUFDLCtCQUFELENBQW5COztBQUVBQyxNQUFNLENBQUNDLEVBQVAsR0FBWSxFQUFaOztBQUVBLEtBQUssSUFBSUMsR0FBVCxJQUFnQkosS0FBaEIsRUFBdUI7QUFDbkIsTUFBSUksR0FBRyxDQUFDQyxPQUFKLENBQVksS0FBWixNQUF1QixDQUFDLENBQTVCLEVBQStCO0FBQzNCO0FBQ0g7O0FBQ0QsTUFBSUMsTUFBTSxHQUFHRixHQUFHLENBQUNHLE9BQUosQ0FBWSxJQUFaLEVBQWtCLEVBQWxCLENBQWI7QUFDQUosRUFBQUEsRUFBRSxDQUFDRyxNQUFELENBQUYsR0FBYU4sS0FBSyxDQUFDSSxHQUFELENBQWxCO0FBQ0g7O0FBRURELEVBQUUsQ0FBQ0ssa0JBQUgsR0FBd0IsQ0FBeEIiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYm94MmQgPSByZXF1aXJlKCcuLi8uLi8uLi9leHRlcm5hbC9ib3gyZC9ib3gyZCcpO1xyXG5cclxud2luZG93LmIyID0ge307XHJcblxyXG5mb3IgKHZhciBrZXkgaW4gYm94MmQpIHtcclxuICAgIGlmIChrZXkuaW5kZXhPZignYjJfJykgIT09IC0xKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3S2V5ID0ga2V5LnJlcGxhY2UoJ2IyJywgJycpO1xyXG4gICAgYjJbbmV3S2V5XSA9IGJveDJkW2tleV07XHJcbn1cclxuXHJcbmIyLm1heFBvbHlnb25WZXJ0aWNlcyA9IDg7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9