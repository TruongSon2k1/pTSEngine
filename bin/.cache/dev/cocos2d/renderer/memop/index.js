
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.TypedArrayPool = exports.RecyclePool = exports.Pool = exports.LinkedArray = exports.FixedArray = exports.CircularPool = void 0;

var _circularPool = _interopRequireDefault(require("./circular-pool"));

exports.CircularPool = _circularPool["default"];

var _fixedArray = _interopRequireDefault(require("./fixed-array"));

exports.FixedArray = _fixedArray["default"];

var _linkedArray = _interopRequireDefault(require("./linked-array"));

exports.LinkedArray = _linkedArray["default"];

var _pool = _interopRequireDefault(require("./pool"));

exports.Pool = _pool["default"];

var _recyclePool = _interopRequireDefault(require("./recycle-pool"));

exports.RecyclePool = _recyclePool["default"];

var _typedArrayPool = _interopRequireDefault(require("./typed-array-pool"));

exports.TypedArrayPool = _typedArrayPool["default"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxtZW1vcFxcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IGRlZmF1bHQgYXMgQ2lyY3VsYXJQb29sIH0gZnJvbSAnLi9jaXJjdWxhci1wb29sJztcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBGaXhlZEFycmF5IH0gZnJvbSAnLi9maXhlZC1hcnJheSc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTGlua2VkQXJyYXkgfSBmcm9tICcuL2xpbmtlZC1hcnJheSc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUG9vbCB9IGZyb20gJy4vcG9vbCc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUmVjeWNsZVBvb2wgfSBmcm9tICcuL3JlY3ljbGUtcG9vbCc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVHlwZWRBcnJheVBvb2wgfSBmcm9tICcuL3R5cGVkLWFycmF5LXBvb2wnOyJdLCJzb3VyY2VSb290IjoiLyJ9