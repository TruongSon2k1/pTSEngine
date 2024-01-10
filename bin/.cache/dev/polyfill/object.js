
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/object.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

// for IE11
if (!Object.assign) {
  Object.assign = function (target, source) {
    return cc.js.mixin(target, source);
  };
} // for Baidu browser
// Implementation reference to: 
// http://2ality.com/2016/02/object-getownpropertydescriptors.html
// http://docs.w3cub.com/javascript/global_objects/reflect/ownkeys/


if (!Object.getOwnPropertyDescriptors) {
  Object.getOwnPropertyDescriptors = function (obj) {
    var descriptors = {};
    var ownKeys = Object.getOwnPropertyNames(obj);

    if (Object.getOwnPropertySymbols) {
      // for IE 11
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(obj));
    }

    for (var i = 0; i < ownKeys.length; ++i) {
      var key = ownKeys[i];
      descriptors[key] = Object.getOwnPropertyDescriptor(obj, key);
    }

    return descriptors;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXHBvbHlmaWxsXFxvYmplY3QuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiYXNzaWduIiwidGFyZ2V0Iiwic291cmNlIiwiY2MiLCJqcyIsIm1peGluIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsIm9iaiIsImRlc2NyaXB0b3JzIiwib3duS2V5cyIsImdldE93blByb3BlcnR5TmFtZXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJjb25jYXQiLCJpIiwibGVuZ3RoIiwia2V5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQSxJQUFJLENBQUNBLE1BQU0sQ0FBQ0MsTUFBWixFQUFvQjtBQUNoQkQsRUFBQUEsTUFBTSxDQUFDQyxNQUFQLEdBQWdCLFVBQVVDLE1BQVYsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQ3RDLFdBQU9DLEVBQUUsQ0FBQ0MsRUFBSCxDQUFNQyxLQUFOLENBQVlKLE1BQVosRUFBb0JDLE1BQXBCLENBQVA7QUFDSCxHQUZEO0FBR0gsRUFFRDtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSSxDQUFDSCxNQUFNLENBQUNPLHlCQUFaLEVBQXVDO0FBQ25DUCxFQUFBQSxNQUFNLENBQUNPLHlCQUFQLEdBQW1DLFVBQVVDLEdBQVYsRUFBZTtBQUM5QyxRQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxRQUFJQyxPQUFPLEdBQUdWLE1BQU0sQ0FBQ1csbUJBQVAsQ0FBMkJILEdBQTNCLENBQWQ7O0FBQ0EsUUFBSVIsTUFBTSxDQUFDWSxxQkFBWCxFQUFrQztBQUFFO0FBQ2hDRixNQUFBQSxPQUFPLEdBQUdBLE9BQU8sQ0FBQ0csTUFBUixDQUFlYixNQUFNLENBQUNZLHFCQUFQLENBQTZCSixHQUE3QixDQUFmLENBQVY7QUFDSDs7QUFDRCxTQUFJLElBQUlNLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBR0osT0FBTyxDQUFDSyxNQUEzQixFQUFtQyxFQUFFRCxDQUFyQyxFQUF1QztBQUNuQyxVQUFJRSxHQUFHLEdBQUdOLE9BQU8sQ0FBQ0ksQ0FBRCxDQUFqQjtBQUNBTCxNQUFBQSxXQUFXLENBQUNPLEdBQUQsQ0FBWCxHQUFtQmhCLE1BQU0sQ0FBQ2lCLHdCQUFQLENBQWdDVCxHQUFoQyxFQUFxQ1EsR0FBckMsQ0FBbkI7QUFDSDs7QUFDRCxXQUFPUCxXQUFQO0FBQ0gsR0FYRDtBQVlIIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIGZvciBJRTExXHJcbmlmICghT2JqZWN0LmFzc2lnbikge1xyXG4gICAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiBjYy5qcy5taXhpbih0YXJnZXQsIHNvdXJjZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGZvciBCYWlkdSBicm93c2VyXHJcbi8vIEltcGxlbWVudGF0aW9uIHJlZmVyZW5jZSB0bzogXHJcbi8vIGh0dHA6Ly8yYWxpdHkuY29tLzIwMTYvMDIvb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvcnMuaHRtbFxyXG4vLyBodHRwOi8vZG9jcy53M2N1Yi5jb20vamF2YXNjcmlwdC9nbG9iYWxfb2JqZWN0cy9yZWZsZWN0L293bmtleXMvXHJcbmlmICghT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHtcclxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIGxldCBkZXNjcmlwdG9ycyA9IHt9O1xyXG4gICAgICAgIGxldCBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcclxuICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyAvLyBmb3IgSUUgMTFcclxuICAgICAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBvd25LZXlzLmxlbmd0aDsgKytpKXtcclxuICAgICAgICAgICAgbGV0IGtleSA9IG93bktleXNbaV07XHJcbiAgICAgICAgICAgIGRlc2NyaXB0b3JzW2tleV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3JzO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvIn0=