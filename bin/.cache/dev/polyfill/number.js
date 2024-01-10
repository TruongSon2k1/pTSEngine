
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/number.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

Number.parseFloat = Number.parseFloat || parseFloat;
Number.parseInt = Number.parseInt || parseInt;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXHBvbHlmaWxsXFxudW1iZXIuanMiXSwibmFtZXMiOlsiTnVtYmVyIiwicGFyc2VGbG9hdCIsInBhcnNlSW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0FBLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQkQsTUFBTSxDQUFDQyxVQUFQLElBQXFCQSxVQUF6QztBQUNBRCxNQUFNLENBQUNFLFFBQVAsR0FBa0JGLE1BQU0sQ0FBQ0UsUUFBUCxJQUFtQkEsUUFBckMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuTnVtYmVyLnBhcnNlRmxvYXQgPSBOdW1iZXIucGFyc2VGbG9hdCB8fCBwYXJzZUZsb2F0O1xyXG5OdW1iZXIucGFyc2VJbnQgPSBOdW1iZXIucGFyc2VJbnQgfHwgcGFyc2VJbnQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9