
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var Pool = /*#__PURE__*/function () {
  function Pool() {
    this.enabled = false;
    this.count = 0;
    this.maxSize = 1024;
  }

  var _proto = Pool.prototype;

  _proto.get = function get() {};

  _proto.put = function put() {};

  _proto.clear = function clear() {};

  return Pool;
}();

exports["default"] = Pool;
cc.pool = {};

Pool.register = function (name, pool) {
  cc.pool[name] = pool;
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxwb29sLmpzIl0sIm5hbWVzIjpbIlBvb2wiLCJlbmFibGVkIiwiY291bnQiLCJtYXhTaXplIiwiZ2V0IiwicHV0IiwiY2xlYXIiLCJjYyIsInBvb2wiLCJyZWdpc3RlciIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBOztTQUNqQkMsVUFBVTtTQUNWQyxRQUFRO1NBQ1JDLFVBQVU7Ozs7O1NBRVZDLE1BQUEsZUFBTyxDQUVOOztTQUNEQyxNQUFBLGVBQU8sQ0FFTjs7U0FDREMsUUFBQSxpQkFBUyxDQUVSOzs7Ozs7QUFHTEMsRUFBRSxDQUFDQyxJQUFILEdBQVUsRUFBVjs7QUFFQVIsSUFBSSxDQUFDUyxRQUFMLEdBQWdCLFVBQVVDLElBQVYsRUFBZ0JGLElBQWhCLEVBQXNCO0FBQ2xDRCxFQUFBQSxFQUFFLENBQUNDLElBQUgsQ0FBUUUsSUFBUixJQUFnQkYsSUFBaEI7QUFDSCxDQUZEIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2wge1xyXG4gICAgZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgY291bnQgPSAwO1xyXG4gICAgbWF4U2l6ZSA9IDEwMjQ7XHJcblxyXG4gICAgZ2V0ICgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBwdXQgKCkge1xyXG5cclxuICAgIH1cclxuICAgIGNsZWFyICgpIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNjLnBvb2wgPSB7fTtcclxuXHJcblBvb2wucmVnaXN0ZXIgPSBmdW5jdGlvbiAobmFtZSwgcG9vbCkge1xyXG4gICAgY2MucG9vbFtuYW1lXSA9IHBvb2w7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=