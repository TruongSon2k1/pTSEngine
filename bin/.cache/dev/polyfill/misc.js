
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/misc.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

if (!Math.sign) {
  Math.sign = function (x) {
    x = +x; // convert to a number

    if (x === 0 || isNaN(x)) {
      return x;
    }

    return x > 0 ? 1 : -1;
  };
}

if (!Math.log2) {
  Math.log2 = function (x) {
    return Math.log(x) * Math.LOG2E;
  };
}

if (!Number.isInteger) {
  Number.isInteger = function (value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  };
}

if (CC_JSB || CC_RUNTIME || !console.time) {
  var Timer = window.performance || Date;

  var _timerTable = Object.create(null);

  console.time = function (label) {
    _timerTable[label] = Timer.now();
  };

  console.timeEnd = function (label) {
    var startTime = _timerTable[label];
    var duration = Timer.now() - startTime;
    console.log(label + ": " + duration + "ms");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXHBvbHlmaWxsXFxtaXNjLmpzIl0sIm5hbWVzIjpbIk1hdGgiLCJzaWduIiwieCIsImlzTmFOIiwibG9nMiIsImxvZyIsIkxPRzJFIiwiTnVtYmVyIiwiaXNJbnRlZ2VyIiwidmFsdWUiLCJpc0Zpbml0ZSIsImZsb29yIiwiQ0NfSlNCIiwiQ0NfUlVOVElNRSIsImNvbnNvbGUiLCJ0aW1lIiwiVGltZXIiLCJ3aW5kb3ciLCJwZXJmb3JtYW5jZSIsIkRhdGUiLCJfdGltZXJUYWJsZSIsIk9iamVjdCIsImNyZWF0ZSIsImxhYmVsIiwibm93IiwidGltZUVuZCIsInN0YXJ0VGltZSIsImR1cmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxDQUFDQSxJQUFJLENBQUNDLElBQVYsRUFBZ0I7QUFDWkQsRUFBQUEsSUFBSSxDQUFDQyxJQUFMLEdBQVksVUFBVUMsQ0FBVixFQUFhO0FBQ3JCQSxJQUFBQSxDQUFDLEdBQUcsQ0FBQ0EsQ0FBTCxDQURxQixDQUNiOztBQUNSLFFBQUlBLENBQUMsS0FBSyxDQUFOLElBQVdDLEtBQUssQ0FBQ0QsQ0FBRCxDQUFwQixFQUF5QjtBQUNyQixhQUFPQSxDQUFQO0FBQ0g7O0FBQ0QsV0FBT0EsQ0FBQyxHQUFHLENBQUosR0FBUSxDQUFSLEdBQVksQ0FBQyxDQUFwQjtBQUNILEdBTkQ7QUFPSDs7QUFFRCxJQUFJLENBQUNGLElBQUksQ0FBQ0ksSUFBVixFQUFnQjtBQUNaSixFQUFBQSxJQUFJLENBQUNJLElBQUwsR0FBWSxVQUFVRixDQUFWLEVBQWE7QUFDckIsV0FBT0YsSUFBSSxDQUFDSyxHQUFMLENBQVNILENBQVQsSUFBY0YsSUFBSSxDQUFDTSxLQUExQjtBQUNILEdBRkQ7QUFHSDs7QUFFRCxJQUFJLENBQUNDLE1BQU0sQ0FBQ0MsU0FBWixFQUF1QjtBQUNuQkQsRUFBQUEsTUFBTSxDQUFDQyxTQUFQLEdBQW1CLFVBQVVDLEtBQVYsRUFBaUI7QUFDaEMsV0FBTyxPQUFPQSxLQUFQLEtBQWlCLFFBQWpCLElBQTZCQyxRQUFRLENBQUNELEtBQUQsQ0FBckMsSUFBZ0RULElBQUksQ0FBQ1csS0FBTCxDQUFXRixLQUFYLE1BQXNCQSxLQUE3RTtBQUNILEdBRkQ7QUFHSDs7QUFFRCxJQUFJRyxNQUFNLElBQUlDLFVBQVYsSUFBd0IsQ0FBQ0MsT0FBTyxDQUFDQyxJQUFyQyxFQUEyQztBQUN2QyxNQUFJQyxLQUFLLEdBQUdDLE1BQU0sQ0FBQ0MsV0FBUCxJQUFzQkMsSUFBbEM7O0FBQ0EsTUFBSUMsV0FBVyxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBQWxCOztBQUNBUixFQUFBQSxPQUFPLENBQUNDLElBQVIsR0FBZSxVQUFVUSxLQUFWLEVBQWlCO0FBQzVCSCxJQUFBQSxXQUFXLENBQUNHLEtBQUQsQ0FBWCxHQUFxQlAsS0FBSyxDQUFDUSxHQUFOLEVBQXJCO0FBQ0gsR0FGRDs7QUFHQVYsRUFBQUEsT0FBTyxDQUFDVyxPQUFSLEdBQWtCLFVBQVVGLEtBQVYsRUFBaUI7QUFDL0IsUUFBSUcsU0FBUyxHQUFHTixXQUFXLENBQUNHLEtBQUQsQ0FBM0I7QUFDQSxRQUFJSSxRQUFRLEdBQUdYLEtBQUssQ0FBQ1EsR0FBTixLQUFjRSxTQUE3QjtBQUNBWixJQUFBQSxPQUFPLENBQUNULEdBQVIsQ0FBZWtCLEtBQWYsVUFBeUJJLFFBQXpCO0FBQ0gsR0FKRDtBQUtIIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKCFNYXRoLnNpZ24pIHtcclxuICAgIE1hdGguc2lnbiA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgeCA9ICt4OyAvLyBjb252ZXJ0IHRvIGEgbnVtYmVyXHJcbiAgICAgICAgaWYgKHggPT09IDAgfHwgaXNOYU4oeCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB4ID4gMCA/IDEgOiAtMTtcclxuICAgIH07XHJcbn1cclxuXHJcbmlmICghTWF0aC5sb2cyKSB7XHJcbiAgICBNYXRoLmxvZzIgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmxvZyh4KSAqIE1hdGguTE9HMkU7XHJcbiAgICB9O1xyXG59XHJcblxyXG5pZiAoIU51bWJlci5pc0ludGVnZXIpIHtcclxuICAgIE51bWJlci5pc0ludGVnZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWx1ZSkgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xyXG4gICAgfTtcclxufVxyXG5cclxuaWYgKENDX0pTQiB8fCBDQ19SVU5USU1FIHx8ICFjb25zb2xlLnRpbWUpIHtcclxuICAgIHZhciBUaW1lciA9IHdpbmRvdy5wZXJmb3JtYW5jZSB8fCBEYXRlO1xyXG4gICAgdmFyIF90aW1lclRhYmxlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIGNvbnNvbGUudGltZSA9IGZ1bmN0aW9uIChsYWJlbCkge1xyXG4gICAgICAgIF90aW1lclRhYmxlW2xhYmVsXSA9IFRpbWVyLm5vdygpO1xyXG4gICAgfTtcclxuICAgIGNvbnNvbGUudGltZUVuZCA9IGZ1bmN0aW9uIChsYWJlbCkge1xyXG4gICAgICAgIHZhciBzdGFydFRpbWUgPSBfdGltZXJUYWJsZVtsYWJlbF07XHJcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gVGltZXIubm93KCkgLSBzdGFydFRpbWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7bGFiZWx9OiAke2R1cmF0aW9ufW1zYCk7XHJcbiAgICB9O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9