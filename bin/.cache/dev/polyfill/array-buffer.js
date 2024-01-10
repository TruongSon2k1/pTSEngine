
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/array-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

if (!ArrayBuffer.isView) {
  var TypedArray = Object.getPrototypeOf(Int8Array);
  ArrayBuffer.isView = typeof TypedArray === 'function' ? function (obj) {
    return obj instanceof TypedArray;
  } : function (obj) {
    // old JSC, phantom, QtWebview
    if (typeof obj !== 'object') {
      return false;
    }

    var ctor = obj.constructor;
    return ctor === Float64Array || ctor === Float32Array || ctor === Uint8Array || ctor === Uint32Array || ctor === Int8Array;
  };
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXHBvbHlmaWxsXFxhcnJheS1idWZmZXIuanMiXSwibmFtZXMiOlsiQXJyYXlCdWZmZXIiLCJpc1ZpZXciLCJUeXBlZEFycmF5IiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJJbnQ4QXJyYXkiLCJvYmoiLCJjdG9yIiwiY29uc3RydWN0b3IiLCJGbG9hdDY0QXJyYXkiLCJGbG9hdDMyQXJyYXkiLCJVaW50OEFycmF5IiwiVWludDMyQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJLENBQUNBLFdBQVcsQ0FBQ0MsTUFBakIsRUFBeUI7QUFDckIsTUFBTUMsVUFBVSxHQUFHQyxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLFNBQXRCLENBQW5CO0FBQ0FMLEVBQUFBLFdBQVcsQ0FBQ0MsTUFBWixHQUFzQixPQUFPQyxVQUFQLEtBQXNCLFVBQXZCLEdBQXFDLFVBQVVJLEdBQVYsRUFBZTtBQUNyRSxXQUFPQSxHQUFHLFlBQVlKLFVBQXRCO0FBQ0gsR0FGb0IsR0FFakIsVUFBVUksR0FBVixFQUFlO0FBQ2Y7QUFDQSxRQUFJLE9BQU9BLEdBQVAsS0FBZSxRQUFuQixFQUE2QjtBQUN6QixhQUFPLEtBQVA7QUFDSDs7QUFDRCxRQUFJQyxJQUFJLEdBQUdELEdBQUcsQ0FBQ0UsV0FBZjtBQUNBLFdBQU9ELElBQUksS0FBS0UsWUFBVCxJQUF5QkYsSUFBSSxLQUFLRyxZQUFsQyxJQUFrREgsSUFBSSxLQUFLSSxVQUEzRCxJQUF5RUosSUFBSSxLQUFLSyxXQUFsRixJQUFpR0wsSUFBSSxLQUFLRixTQUFqSDtBQUNILEdBVEQ7QUFVSCIsInNvdXJjZXNDb250ZW50IjpbImlmICghQXJyYXlCdWZmZXIuaXNWaWV3KSB7XHJcbiAgICBjb25zdCBUeXBlZEFycmF5ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKEludDhBcnJheSk7XHJcbiAgICBBcnJheUJ1ZmZlci5pc1ZpZXcgPSAodHlwZW9mIFR5cGVkQXJyYXkgPT09ICdmdW5jdGlvbicpID8gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xyXG4gICAgfSA6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAvLyBvbGQgSlNDLCBwaGFudG9tLCBRdFdlYnZpZXdcclxuICAgICAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY3RvciA9IG9iai5jb25zdHJ1Y3RvcjtcclxuICAgICAgICByZXR1cm4gY3RvciA9PT0gRmxvYXQ2NEFycmF5IHx8IGN0b3IgPT09IEZsb2F0MzJBcnJheSB8fCBjdG9yID09PSBVaW50OEFycmF5IHx8IGN0b3IgPT09IFVpbnQzMkFycmF5IHx8IGN0b3IgPT09IEludDhBcnJheTtcclxuICAgIH07XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=