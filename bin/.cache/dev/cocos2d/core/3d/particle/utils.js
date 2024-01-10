
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

// SameValue algorithm
if (!Object.is) {
  Object.is = function (x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };
}
/**
 * !#en
 * Helper class for ES5 Map.
 * !#zh
 * ES5 Map 辅助类。
 * @class MapUtils
 */


var MapUtils = /*#__PURE__*/function () {
  function MapUtils(data) {
    this.datas = [];
    !data && (data = []);
    this.datas = [];
    var that = this;
    data.forEach(function (item) {
      if (!that.has(item[0])) {
        that.datas.push({
          key: item[0],
          value: item[1]
        });
      }
    });
  }

  var _proto = MapUtils.prototype;

  _proto.size = function size() {
    return this.datas.length;
  };

  _proto.set = function set(key, value) {
    this["delete"](key);
    this.datas.push({
      key: key,
      value: value
    });
  };

  _proto.get = function get(key) {
    var value = undefined;
    var datas = this.datas;

    for (var i = 0, len = datas.length; i < len; i++) {
      if (Object.is(key, datas[i].key)) {
        value = datas[i].value;
        break;
      }
    }

    return value;
  };

  _proto.has = function has(key) {
    var res = false;
    var datas = this.datas;

    for (var i = 0, len = datas.length; i < len; i++) {
      if (Object.is(key, datas[i].key)) {
        res = true;
        break;
      }
    }

    return res;
  };

  _proto.clear = function clear() {
    this.datas.length = 0;
  };

  _proto["delete"] = function _delete(key) {
    var res = false;
    var datas = this.datas;

    for (var i = 0, len = datas.length; i < len; i++) {
      if (Object.is(key, datas[i].key)) {
        datas.splice(i, 1);
        res = true;
        break;
      }
    }

    return res;
  };

  _proto.keys = function keys() {
    var datas = this.datas;
    var keys = [];

    for (var i = 0, len = datas.length; i < len; i++) {
      keys.push(datas[i].key);
    }

    return keys;
  };

  _proto.values = function values() {
    var index = 0;
    var datas = this.datas;
    return {
      next: function next() {
        if (datas.length === 0 || datas[index] === undefined) {
          return {
            value: undefined,
            done: true
          };
        }

        return {
          value: datas[index++].value,
          done: false
        };
      }
    };
  };

  return MapUtils;
}();

exports["default"] = MapUtils;
;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcdXRpbHMudHMiXSwibmFtZXMiOlsiT2JqZWN0IiwiaXMiLCJ4IiwieSIsIk1hcFV0aWxzIiwiZGF0YSIsImRhdGFzIiwidGhhdCIsImZvckVhY2giLCJpdGVtIiwiaGFzIiwicHVzaCIsImtleSIsInZhbHVlIiwic2l6ZSIsImxlbmd0aCIsInNldCIsImdldCIsInVuZGVmaW5lZCIsImkiLCJsZW4iLCJyZXMiLCJjbGVhciIsInNwbGljZSIsImtleXMiLCJ2YWx1ZXMiLCJpbmRleCIsIm5leHQiLCJkb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJLENBQUNBLE1BQU0sQ0FBQ0MsRUFBWixFQUFnQjtBQUNaRCxFQUFBQSxNQUFNLENBQUNDLEVBQVAsR0FBWSxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTtBQUN2QixRQUFJRCxDQUFDLEtBQUtDLENBQVYsRUFBYTtBQUNULGFBQU9ELENBQUMsS0FBSyxDQUFOLElBQVcsSUFBSUEsQ0FBSixLQUFVLElBQUlDLENBQWhDO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsYUFBT0QsQ0FBQyxLQUFLQSxDQUFOLElBQVdDLENBQUMsS0FBS0EsQ0FBeEI7QUFDSDtBQUNKLEdBTkQ7QUFPSDtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7SUFDcUJDO0FBR2pCLG9CQUFhQyxJQUFiLEVBQW1CO0FBQUEsU0FGbkJDLEtBRW1CLEdBRlgsRUFFVztBQUNmLEtBQUNELElBQUQsS0FBVUEsSUFBSSxHQUFHLEVBQWpCO0FBRUEsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFFQSxRQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUVBRixJQUFBQSxJQUFJLENBQUNHLE9BQUwsQ0FBYSxVQUFVQyxJQUFWLEVBQWdCO0FBQ3pCLFVBQUksQ0FBQ0YsSUFBSSxDQUFDRyxHQUFMLENBQVNELElBQUksQ0FBQyxDQUFELENBQWIs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QUFJLENBQUNiLElBQUwsQ0FBVUwsS0FBSyxDQUFDYSxDQUFELENBQUwsQ0FBU1AsR0FBbkI7QUFDSDs7QUFFRCxXQUFPWSxJQUFQO0FBQ0g7O1NBRURDLFNBQUEsa0JBQVU7QUFDTixRQUFJQyxLQUFLLEdBQUcsQ0FBWjtBQUNBLFFBQUlwQixLQUFLLEdBQUcsS0FBS0EsS0FBakI7QUFDQSxXQUFPO0FBQ0hxQixNQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxZQUFJckIsS0FBSyxDQUFDUyxNQUFOLEtBQWlCLENBQWpCLElBQXNCVCxLQUFLLENBQUNvQixLQUFELENBQUwsS0FBaUJSLFNBQTNDLEVBQXNEO0FBQ2xELGlCQUFPO0FBQ0hMLFlBQUFBLEtBQUssRUFBRUssU0FESjtBQUVIVSxZQUFBQSxJQUFJLEVBQUU7QUFGSCxXQUFQO0FBSUg7O0FBQ0QsZUFBTztBQUNIZixVQUFBQSxLQUFLLEVBQUVQLEtBQUssQ0FBQ29CLEtBQUssRUFBTixDQUFMLENBQWViLEtBRG5CO0FBRUhlLFVBQUFBLElBQUksRUFBRTtBQUZILFNBQVA7QUFJSDtBQVpFLEtBQVA7QUFjSDs7Ozs7O0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXHJcbmlmICghT2JqZWN0LmlzKSB7XHJcbiAgICBPYmplY3QuaXMgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgaWYgKHggPT09IHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogSGVscGVyIGNsYXNzIGZvciBFUzUgTWFwLlxyXG4gKiAhI3poXHJcbiAqIEVTNSBNYXAg6L6F5Yqp57G744CCXHJcbiAqIEBjbGFzcyBNYXBVdGlsc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwVXRpbHMge1xyXG4gICAgZGF0YXMgPSBbXTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IgKGRhdGEpIHtcclxuICAgICAgICAhZGF0YSAmJiAoZGF0YSA9IFtdKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhcyA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhhdC5oYXMoaXRlbVswXSkpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGF0YXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBpdGVtWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtWzFdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNpemUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIHRoaXMuZGF0YXMucHVzaCh7XHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgKGtleSkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgZGF0YXMgPSB0aGlzLmRhdGFzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBkYXRhcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmlzKGtleSwgZGF0YXNbaV0ua2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhc1tpXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBoYXMgKGtleSkge1xyXG4gICAgICAgIGxldCByZXMgPSBmYWxzZTtcclxuICAgICAgICBsZXQgZGF0YXMgPSB0aGlzLmRhdGFzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBkYXRhcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmlzKGtleSwgZGF0YXNbaV0ua2V5KSkge1xyXG4gICAgICAgICAgICAgICAgcmVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIgKCkge1xyXG4gICAgICAgIHRoaXMuZGF0YXMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUgKGtleSkge1xyXG4gICAgICAgIGxldCByZXMgPSBmYWxzZTtcclxuICAgICAgICBsZXQgZGF0YXMgPSB0aGlzLmRhdGFzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBkYXRhcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmlzKGtleSwgZGF0YXNbaV0ua2V5KSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgcmVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAga2V5cyAoKSB7XHJcbiAgICAgICAgbGV0IGRhdGFzID0gdGhpcy5kYXRhcztcclxuICAgICAgICBsZXQga2V5cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBkYXRhcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBrZXlzLnB1c2goZGF0YXNbaV0ua2V5KTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZXR1cm4ga2V5cztcclxuICAgIH1cclxuXHJcbiAgICB2YWx1ZXMgKCkge1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgbGV0IGRhdGFzID0gdGhpcy5kYXRhcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YXMubGVuZ3RoID09PSAwIHx8IGRhdGFzW2luZGV4XSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhc1tpbmRleCsrXS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb25lOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG59OyJdLCJzb3VyY2VSb290IjoiLyJ9