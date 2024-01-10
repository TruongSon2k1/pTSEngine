
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/material-pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _pool = _interopRequireDefault(require("../../utils/pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * {
 *   effectUuid: {
 *     defineSerializeKey: []
 *   }
 * }
 */
var MaterialPool = /*#__PURE__*/function (_Pool) {
  _inheritsLoose(MaterialPool, _Pool);

  function MaterialPool() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Pool.call.apply(_Pool, [this].concat(args)) || this;
    _this.enabled = false;
    _this._pool = {};
    return _this;
  }

  var _proto = MaterialPool.prototype;

  _proto.get = function get(exampleMat, renderComponent) {
    var pool = this._pool;

    if (exampleMat instanceof cc.MaterialVariant) {
      if (exampleMat._owner) {
        if (exampleMat._owner === renderComponent) {
          return exampleMat;
        } else {
          exampleMat = exampleMat.material;
        }
      } else {
        exampleMat._owner = renderComponent;
        return exampleMat;
      }
    }

    var instance;

    if (this.enabled) {
      var uuid = exampleMat.effectAsset._uuid;

      if (pool[uuid]) {
        var key = _utils["default"].serializeDefines(exampleMat._effect._defines) + _utils["default"].serializeTechniques(exampleMat._effect._techniques);

        instance = pool[uuid][key] && pool[uuid][key].pop();
      }
    }

    if (!instance) {
      instance = new cc.MaterialVariant(exampleMat);
      instance._name = exampleMat._name + ' (Instance)';
      instance._uuid = exampleMat._uuid;
    } else {
      this.count--;
    }

    instance._owner = renderComponent;
    return instance;
  };

  _proto.put = function put(mat) {
    if (!this.enabled || !mat._owner) {
      return;
    }

    var pool = this._pool;
    var uuid = mat.effectAsset._uuid;

    if (!pool[uuid]) {
      pool[uuid] = {};
    }

    var key = _utils["default"].serializeDefines(mat._effect._defines) + _utils["default"].serializeTechniques(mat._effect._techniques);

    if (!pool[uuid][key]) {
      pool[uuid][key] = [];
    }

    if (this.count > this.maxSize) return;

    this._clean(mat);

    pool[uuid][key].push(mat);
    this.count++;
  };

  _proto.clear = function clear() {
    this._pool = {};
    this.count = 0;
  };

  _proto._clean = function _clean(mat) {
    mat._owner = null;
  };

  return MaterialPool;
}(_pool["default"]);

var materialPool = new MaterialPool();

_pool["default"].register('material', materialPool);

var _default = materialPool;
exports["default"] = _default;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcbWF0ZXJpYWxcXG1hdGVyaWFsLXBvb2wuanMiXSwibmFtZXMiOlsiTWF0ZXJpYWxQb29sIiwiZW5hYmxlZCIsIl9wb29sIiwiZ2V0IiwiZXhhbXBsZU1hdCIsInJlbmRlckNvbXBvbmVudCIsInBvb2wiLCJjYyIsIk1hdGVyaWFsVmFyaWFudCIsIl9vd25lciIsIm1hdGVyaWFsIiwiaW5zdGFuY2UiLCJ1dWlkIiwiZWZmZWN0QXNzZXQiLCJfdXVpZCIsImtleSIsInV0aWxzIiwic2VyaWFsaXplRGVmaW5lcyIsIl9lZmZlY3QiLCJfZGVmaW5lcyIsInNlcmlhbGl6ZVRlY2huaXF1ZXMiLCJfdGVjaG5pcXVlcyIsInBvcCIsIl9uYW1lIiwiY291bnQiLCJwdXQiLCJtYXQiLCJtYXhTaXplIiwiX2NsZWFuIiwicHVzaCIsImNsZWFyIiwiUG9vbCIsIm1hdGVyaWFsUG9vbCIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDTUE7Ozs7Ozs7Ozs7O1VBRUZDLFVBQVU7VUFFVkMsUUFBUTs7Ozs7O1NBRVJDLE1BQUEsYUFBS0MsVUFBTCxFQUFpQkMsZUFBakIsRUFBa0M7QUFDOUIsUUFBSUMsSUFBSSxHQUFHLEtBQUtKLEtBQWhCOztBQUVBLFFBQUlFLFVBQVUsWUFBWUcsRUFBRSxDQUFDQyxlQUE3QixFQUE4QztBQUMxQyxVQUFJSixVQUFVLENBQUNLLE1BQWYsRUFBdUI7QUFDbkIsWUFBSUwsVUFBVSxDQUFDSyxNQUFYLEtBQXNCSixlQUExQixFQUEyQztBQUN2QyxpQkFBT0QsVUFBUDtBQUNILFNBRkQsTUFHSztBQUNEQSxVQUFBQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ00sUUFBeEI7QUFDSDtBQUNKLE9BUEQsTUFRSztBQUNETixRQUFBQSxVQUFVLENBQUNLLE1BQVgsR0FBb0JKLGVBQXBCO0FBQ0EsZUFBT0QsVUFBUDtBQUNIO0FBQ0o7O0FBRUQsUUFBSU8sUUFBSjs7QUFDQSxRQUFJLEtBQUtWLE9BQVQsRUFBa0I7QUFDZCxVQUFJVyxJQUFJLEdBQUdSLFVBQVUsQ0FBQ1MsV0FBWCxDQUF1QkMsS0FBbEM7O0FBQ0EsVUFBSVIsSUFBSSxDQUFDTSxJQUFELENBQVIsRUFBZ0I7QUFDWixZQUFJRyxHQUFHLEdBQ0hDLGtCQUFNQyxnQkFBTixDQUF1QmIsVUFBVSxDQUFDYyxPQUFYLENBQW1CQyxRQUExQyxJQUNBSCxrQkFBTUksbUJBQU4sQ0FBMEJoQixVQUFVLENBQUNjLE9BQVgsQ0FBbUJHLFdBQTdDLENBRko7O0FBR0FWLFFBQUFBLFFBQVEsR0FBR0wsSUFBSSxDQUFDTSxJQUFELENBQUosQ0FBV0csR0FBWCxLQUFtQlQsSUFBSSxDQUFDTSxJQUFELENBQUosQ0FBV0csR0FBWCxFQUFnQk8sR0FBaEIsRUFBOUI7QUFDSDtBQUNKOztBQUVELFFBQUksQ0FBQ1gsUUFBTCxFQUFlO0FBQ1hBLE1BQUFBLFFBQVEsR0FBRyxJQUFJSixFQUFFLENBQUNDLGVBQVAsQ0FBdUJKLFVBQXZCLENBQVg7QUFDQU8sTUFBQUEsUUFBUSxDQUFDWSxLQUFULEdBQWlCbkIsVUFBVSxDQUFDbUIsS0FBWCxHQUFtQixhQUFwQztBQUNBWixNQUFBQSxRQUFRLENBQUNHLEtBQVQsR0FBaUJWLFVBQVUsQ0FBQ1UsS0FBNUI7QUFDSCxLQUpELE1BS0s7QUFDRCxXQUFLVSxLQUFMO0FBQ0g7O0FBRURiLElBQUFBLFFBQVEsQ0FBQ0YsTUFBVCxHQUFrQkosZUFBbEI7QUFFQSxXQUFPTSxRQUFQO0FBQ0g7O1NBRURjLE1BQUEsYUFBS0MsR0FBTCxFQUFVO0FBQ04sUUFBSSxDQUFDLEtBQUt6QixPQUFOLElBQWlCLENBQUN5QixHQUFHLENBQUNqQixNQUExQixFQUFrQztBQUM5QjtBQUNIOztBQUVELFFBQUlILElBQUksR0FBRyxLQUFLSixLQUFoQjtBQUNBLFFBQUlVLElBQUksR0FBR2MsR0FBRyxDQUFDYixXQUFKLENBQWdCQyxLQUEzQjs7QUFDQSxRQUFJLENBQUNSLElBQUksQ0FBQ00sSUFBRCxDQUFULEVBQWlCO0FBQ2JOLE1BQUFBLElBQUksQ0FBQ00sSUFBRCxDQUFKLEdBQWEsRUFBYjtBQUNIOztBQUNELFFBQUlHLEdBQUcsR0FDSEMsa0JBQU1DLGdCQUFOLENBQXVCUyxHQUFHLENBQUNSLE9BQUosQ0FBWUMsUUFBbkMsSUFDQUgsa0JBQU1JLG1CQUFOLENBQTBCTSxHQUFHLENBQUNSLE9BQUosQ0FBWUcsV0FBdEMsQ0FGSjs7QUFHQSxRQUFJLENBQUNmLElBQUksQ0FBQ00sSUFBRCxDQUFKLENBQVdHLEdBQVgsQ0FBTCxFQUFzQjtBQUNsQlQsTUFBQUEsSUFBSSxDQUFDTSxJQUFELENBQUosQ0FBV0csR0FBWCxJQUFrQixFQUFsQjtBQUNIOztBQUNELFFBQUksS0FBS1MsS0FBTCxHQUFhLEtBQUtHLE9BQXRCLEVBQStCOztBQUUvQixTQUFLQyxNQUFMLENBQVlGLEdBQVo7O0FBQ0FwQixJQUFBQSxJQUFJLENBQUNNLElBQUQsQ0FBSixDQUFXRyxHQUFYLEVBQWdCYyxJQUFoQixDQUFxQkgsR0FBckI7QUFDQSxTQUFLRixLQUFMO0FBQ0g7O1NBRURNLFFBQUEsaUJBQVM7QUFDTCxTQUFLNUIsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLc0IsS0FBTCxHQUFhLENBQWI7QUFDSDs7U0FFREksU0FBQSxnQkFBUUYsR0FBUixFQUFhO0FBQ1RBLElBQUFBLEdBQUcsQ0FBQ2pCLE1BQUosR0FBYSxJQUFiO0FBQ0g7OztFQS9Fc0JzQjs7QUFrRjNCLElBQUlDLFlBQVksR0FBRyxJQUFJaEMsWUFBSixFQUFuQjs7QUFDQStCLGlCQUFLRSxRQUFMLENBQWMsVUFBZCxFQUEwQkQsWUFBMUI7O2VBQ2VBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgUG9vbCBmcm9tICcuLi8uLi91dGlscy9wb29sJztcclxuXHJcbi8qKlxyXG4gKiB7XHJcbiAqICAgZWZmZWN0VXVpZDoge1xyXG4gKiAgICAgZGVmaW5lU2VyaWFsaXplS2V5OiBbXVxyXG4gKiAgIH1cclxuICogfVxyXG4gKi9cclxuY2xhc3MgTWF0ZXJpYWxQb29sIGV4dGVuZHMgUG9vbCB7XHJcbiAgICAvLyBkZWZhdWx0IGRpc2FibGVkIG1hdGVyaWFsIHBvb2xcclxuICAgIGVuYWJsZWQgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgX3Bvb2wgPSB7fTtcclxuXHJcbiAgICBnZXQgKGV4YW1wbGVNYXQsIHJlbmRlckNvbXBvbmVudCkge1xyXG4gICAgICAgIGxldCBwb29sID0gdGhpcy5fcG9vbDtcclxuXHJcbiAgICAgICAgaWYgKGV4YW1wbGVNYXQgaW5zdGFuY2VvZiBjYy5NYXRlcmlhbFZhcmlhbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV4YW1wbGVNYXQuX293bmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXhhbXBsZU1hdC5fb3duZXIgPT09IHJlbmRlckNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleGFtcGxlTWF0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhhbXBsZU1hdCA9IGV4YW1wbGVNYXQubWF0ZXJpYWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBleGFtcGxlTWF0Ll9vd25lciA9IHJlbmRlckNvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBleGFtcGxlTWF0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBsZXQgdXVpZCA9IGV4YW1wbGVNYXQuZWZmZWN0QXNzZXQuX3V1aWQ7XHJcbiAgICAgICAgICAgIGlmIChwb29sW3V1aWRdKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuc2VyaWFsaXplRGVmaW5lcyhleGFtcGxlTWF0Ll9lZmZlY3QuX2RlZmluZXMpICtcclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zZXJpYWxpemVUZWNobmlxdWVzKGV4YW1wbGVNYXQuX2VmZmVjdC5fdGVjaG5pcXVlcyk7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IHBvb2xbdXVpZF1ba2V5XSAmJiBwb29sW3V1aWRdW2tleV0ucG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIWluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IGNjLk1hdGVyaWFsVmFyaWFudChleGFtcGxlTWF0KTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuX25hbWUgPSBleGFtcGxlTWF0Ll9uYW1lICsgJyAoSW5zdGFuY2UpJztcclxuICAgICAgICAgICAgaW5zdGFuY2UuX3V1aWQgPSBleGFtcGxlTWF0Ll91dWlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb3VudC0tO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGluc3RhbmNlLl9vd25lciA9IHJlbmRlckNvbXBvbmVudDtcclxuICAgIFxyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHV0IChtYXQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCB8fCAhbWF0Ll9vd25lcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcG9vbCA9IHRoaXMuX3Bvb2w7XHJcbiAgICAgICAgbGV0IHV1aWQgPSBtYXQuZWZmZWN0QXNzZXQuX3V1aWQ7XHJcbiAgICAgICAgaWYgKCFwb29sW3V1aWRdKSB7XHJcbiAgICAgICAgICAgIHBvb2xbdXVpZF0gPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGtleSA9IFxyXG4gICAgICAgICAgICB1dGlscy5zZXJpYWxpemVEZWZpbmVzKG1hdC5fZWZmZWN0Ll9kZWZpbmVzKSArXHJcbiAgICAgICAgICAgIHV0aWxzLnNlcmlhbGl6ZVRlY2huaXF1ZXMobWF0Ll9lZmZlY3QuX3RlY2huaXF1ZXMpO1xyXG4gICAgICAgIGlmICghcG9vbFt1dWlkXVtrZXldKSB7XHJcbiAgICAgICAgICAgIHBvb2xbdXVpZF1ba2V5XSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb3VudCA+IHRoaXMubWF4U2l6ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLl9jbGVhbihtYXQpO1xyXG4gICAgICAgIHBvb2xbdXVpZF1ba2V5XS5wdXNoKG1hdCk7XHJcbiAgICAgICAgdGhpcy5jb3VudCsrO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICB0aGlzLl9wb29sID0ge307XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFuIChtYXQpIHtcclxuICAgICAgICBtYXQuX293bmVyID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxubGV0IG1hdGVyaWFsUG9vbCA9IG5ldyBNYXRlcmlhbFBvb2woKTtcclxuUG9vbC5yZWdpc3RlcignbWF0ZXJpYWwnLCBtYXRlcmlhbFBvb2wpO1xyXG5leHBvcnQgZGVmYXVsdCBtYXRlcmlhbFBvb2w7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9