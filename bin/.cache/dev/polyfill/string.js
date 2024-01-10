
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/string.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.lastIndexOf(searchString, position) === position;
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, position) {
    if (typeof position === 'undefined' || position > this.length) {
      position = this.length;
    }

    position -= searchString.length;
    var lastIndex = this.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

if (!String.prototype.trimLeft) {
  String.prototype.trimLeft = function () {
    return this.replace(/^\s+/, '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXHBvbHlmaWxsXFxzdHJpbmcuanMiXSwibmFtZXMiOlsiU3RyaW5nIiwicHJvdG90eXBlIiwic3RhcnRzV2l0aCIsInNlYXJjaFN0cmluZyIsInBvc2l0aW9uIiwibGFzdEluZGV4T2YiLCJlbmRzV2l0aCIsImxlbmd0aCIsImxhc3RJbmRleCIsImluZGV4T2YiLCJ0cmltTGVmdCIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJLENBQUNBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsVUFBdEIsRUFBa0M7QUFDOUJGLEVBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsVUFBakIsR0FBOEIsVUFBVUMsWUFBVixFQUF3QkMsUUFBeEIsRUFBa0M7QUFDNURBLElBQUFBLFFBQVEsR0FBR0EsUUFBUSxJQUFJLENBQXZCO0FBQ0EsV0FBTyxLQUFLQyxXQUFMLENBQWlCRixZQUFqQixFQUErQkMsUUFBL0IsTUFBNkNBLFFBQXBEO0FBQ0gsR0FIRDtBQUlIOztBQUVELElBQUksQ0FBQ0osTUFBTSxDQUFDQyxTQUFQLENBQWlCSyxRQUF0QixFQUFnQztBQUM1Qk4sRUFBQUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCSyxRQUFqQixHQUE0QixVQUFVSCxZQUFWLEVBQXdCQyxRQUF4QixFQUFrQztBQUMxRCxRQUFJLE9BQU9BLFFBQVAsS0FBb0IsV0FBcEIsSUFBbUNBLFFBQVEsR0FBRyxLQUFLRyxNQUF2RCxFQUErRDtBQUMzREgsTUFBQUEsUUFBUSxHQUFHLEtBQUtHLE1BQWhCO0FBQ0g7O0FBQ0RILElBQUFBLFFBQVEsSUFBSUQsWUFBWSxDQUFDSSxNQUF6QjtBQUNBLFFBQUlDLFNBQVMsR0FBRyxLQUFLQyxPQUFMLENBQWFOLFlBQWIsRUFBMkJDLFFBQTNCLENBQWhCO0FBQ0EsV0FBT0ksU0FBUyxLQUFLLENBQUMsQ0FBZixJQUFvQkEsU0FBUyxLQUFLSixRQUF6QztBQUNILEdBUEQ7QUFRSDs7QUFFRCxJQUFJLENBQUNKLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQlMsUUFBdEIsRUFBZ0M7QUFDNUJWLEVBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQlMsUUFBakIsR0FBNEIsWUFBWTtBQUNwQyxXQUFPLEtBQUtDLE9BQUwsQ0FBYSxNQUFiLEVBQXFCLEVBQXJCLENBQVA7QUFDSCxHQUZEO0FBR0giLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoIVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCkge1xyXG4gICAgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcclxuICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8IDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGFzdEluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT09IHBvc2l0aW9uO1xyXG4gICAgfTtcclxufVxyXG5cclxuaWYgKCFTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKSB7XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcclxuICAgICAgICBpZiAodHlwZW9mIHBvc2l0aW9uID09PSAndW5kZWZpbmVkJyB8fCBwb3NpdGlvbiA+IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGxhc3RJbmRleCA9IHRoaXMuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcclxuICAgICAgICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xyXG4gICAgfTtcclxufVxyXG5cclxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnRyaW1MZWZ0KSB7XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLnRyaW1MZWZ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrLywgJycpO1xyXG4gICAgfTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==