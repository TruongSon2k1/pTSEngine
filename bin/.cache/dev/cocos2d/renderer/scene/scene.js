
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/scene/scene.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _memop = require("../memop");

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

/**
 * A representation of the scene
 */
var Scene = /*#__PURE__*/function () {
  /**
   * Setup a default empty scene
   */
  function Scene(app) {
    this._lights = new _memop.FixedArray(16);
    this._models = new _memop.FixedArray(16);
    this._cameras = new _memop.FixedArray(16);
    this._debugCamera = null;
    this._app = app; // NOTE: we don't use pool for views (because it's less changed and it doesn't have poolID)

    this._views = [];
  }

  var _proto = Scene.prototype;

  _proto._add = function _add(pool, item) {
    if (item._poolID !== -1) {
      return;
    }

    pool.push(item);
    item._poolID = pool.length - 1;
  };

  _proto._remove = function _remove(pool, item) {
    if (item._poolID === -1) {
      return;
    }

    pool.data[pool.length - 1]._poolID = item._poolID;
    pool.fastRemove(item._poolID);
    item._poolID = -1;
  }
  /**
   * reset the model viewIDs
   */
  ;

  _proto.reset = function reset() {
    for (var i = 0; i < this._models.length; ++i) {
      var model = this._models.data[i];
      model._viewID = -1;
    }
  }
  /**
   * Set the debug camera
   * @param {Camera} cam the debug camera
   */
  ;

  _proto.setDebugCamera = function setDebugCamera(cam) {
    this._debugCamera = cam;
  }
  /**
   * Get the count of registered cameras
   * @returns {number} camera count
   */
  ;

  _proto.getCameraCount = function getCameraCount() {
    return this._cameras.length;
  }
  /**
   * Get the specified camera
   * @param {number} idx camera index
   * @returns {Camera} the specified camera
   */
  ;

  _proto.getCamera = function getCamera(idx) {
    return this._cameras.data[idx];
  }
  /**
   * register a camera
   * @param {Camera} camera the new camera
   */
  ;

  _proto.addCamera = function addCamera(camera) {
    this._add(this._cameras, camera);
  }
  /**
   * remove a camera
   * @param {Camera} camera the camera to be removed
   */
  ;

  _proto.removeCamera = function removeCamera(camera) {
    this._remove(this._cameras, camera);
  }
  /**
   * Get the count of registered model
   * @returns {number} model count
   */
  ;

  _proto.getModelCount = function getModelCount() {
    return this._models.length;
  }
  /**
   * Get the specified model
   * @param {number} idx model index
   * @returns {Model} the specified model
   */
  ;

  _proto.getModel = function getModel(idx) {
    return this._models.data[idx];
  }
  /**
   * register a model
   * @param {Model} model the new model
   */
  ;

  _proto.addModel = function addModel(model) {
    this._add(this._models, model);
  }
  /**
   * remove a model
   * @param {Model} model the model to be removed
   */
  ;

  _proto.removeModel = function removeModel(model) {
    this._remove(this._models, model);
  }
  /**
   * Get the count of registered light
   * @returns {number} light count
   */
  ;

  _proto.getLightCount = function getLightCount() {
    return this._lights.length;
  }
  /**
   * Get the specified light
   * @param {number} idx light index
   * @returns {Light} the specified light
   */
  ;

  _proto.getLight = function getLight(idx) {
    return this._lights.data[idx];
  }
  /**
   * register a light
   * @param {Light} light the new light
   */
  ;

  _proto.addLight = function addLight(light) {
    this._add(this._lights, light);
  }
  /**
   * remove a light
   * @param {Light} light the light to be removed
   */
  ;

  _proto.removeLight = function removeLight(light) {
    this._remove(this._lights, light);
  }
  /**
   * register a view
   * @param {View} view the new view
   */
  ;

  _proto.addView = function addView(view) {
    if (this._views.indexOf(view) === -1) {
      this._views.push(view);
    }
  }
  /**
   * remove a view
   * @param {View} view the view to be removed
   */
  ;

  _proto.removeView = function removeView(view) {
    var idx = this._views.indexOf(view);

    if (idx !== -1) {
      this._views.splice(idx, 1);
    }
  };

  return Scene;
}();

var _default = Scene;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxzY2VuZVxcc2NlbmUuanMiXSwibmFtZXMiOlsiU2NlbmUiLCJhcHAiLCJfbGlnaHRzIiwiRml4ZWRBcnJheSIsIl9tb2RlbHMiLCJfY2FtZXJhcyIsIl9kZWJ1Z0NhbWVyYSIsIl9hcHAiLCJfdmlld3MiLCJfYWRkIiwicG9vbCIsIml0ZW0iLCJfcG9vbElEIiwicHVzaCIsImxlbmd0aCIsIl9yZW1vdmUiLCJkYXRhIiwiZmFzdFJlbW92ZSIsInJlc2V0IiwiaSIsIm1vZGVsIiwiX3ZpZXdJRCIsInNldERlYnVnQ2FtZXJhIiwiY2FtIiwiZ2V0Q2FtZXJhQ291bnQiLCJnZXRDYW1lcmEiLCJpZHgiLCJhZGRDYW1lcmEiLCJjYW1lcmEiLCJyZW1vdmVDYW1lcmEiLCJnZXRNb2RlbENvdW50IiwiZ2V0TW9kZWwiLCJhZGRNb2RlbCIsInJlbW92ZU1vZGVsIiwiZ2V0TGlnaHRDb3VudCIsImdldExpZ2h0IiwiYWRkTGlnaHQiLCJsaWdodCIsInJlbW92ZUxpZ2h0IiwiYWRkVmlldyIsInZpZXciLCJpbmRleE9mIiwicmVtb3ZlVmlldyIsInNwbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUZBOztBQUlBO0FBQ0E7QUFDQTtJQUNNQTtBQUNKO0FBQ0Y7QUFDQTtBQUNFLGlCQUFZQyxHQUFaLEVBQWlCO0FBQ2YsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGlCQUFKLENBQWUsRUFBZixDQUFmO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlELGlCQUFKLENBQWUsRUFBZixDQUFmO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQixJQUFJRixpQkFBSixDQUFlLEVBQWYsQ0FBaEI7QUFDQSxTQUFLRyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZTixHQUFaLENBTGUsQ0FPZjs7QUFDQSxTQUFLTyxNQUFMLEdBQWMsRUFBZDtBQUNEOzs7O1NBRURDLE9BQUEsY0FBS0MsSUFB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QWxCLENBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7U0FDRVUsV0FBQSxrQkFBU0MsS0FBVCxFQUFnQjtBQUNkLFNBQUs1QixJQUFMLENBQVUsS0FBS1AsT0FBZixFQUF3Qm1DLEtBQXhCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTs7O1NBQ0VDLGNBQUEscUJBQVlELEtBQVosRUFBbUI7QUFDakIsU0FBS3RCLE9BQUwsQ0FBYSxLQUFLYixPQUFsQixFQUEyQm1DLEtBQTNCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTs7O1NBQ0VFLFVBQUEsaUJBQVFDLElBQVIsRUFBYztBQUNaLFFBQUksS0FBS2hDLE1BQUwsQ0FBWWlDLE9BQVosQ0FBb0JELElBQXBCLE1BQThCLENBQUMsQ0FBbkMsRUFBc0M7QUFDcEMsV0FBS2hDLE1BQUwsQ0FBWUssSUFBWixDQUFpQjJCLElBQWpCO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7U0FDRUUsYUFBQSxvQkFBV0YsSUFBWCxFQUFpQjtBQUNmLFFBQUlkLEdBQUcsR0FBRyxLQUFLbEIsTUFBTCxDQUFZaUMsT0FBWixDQUFvQkQsSUFBcEIsQ0FBVjs7QUFDQSxRQUFJZCxHQUFHLEtBQUssQ0FBQyxDQUFiLEVBQWdCO0FBQ2QsV0FBS2xCLE1BQUwsQ0FBWW1DLE1BQVosQ0FBbUJqQixHQUFuQixFQUF3QixDQUF4QjtBQUNEO0FBQ0Y7Ozs7O2VBR1kxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuaW1wb3J0IHsgRml4ZWRBcnJheSB9IGZyb20gJy4uL21lbW9wJztcclxuXHJcbi8qKlxyXG4gKiBBIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzY2VuZVxyXG4gKi9cclxuY2xhc3MgU2NlbmUge1xyXG4gIC8qKlxyXG4gICAqIFNldHVwIGEgZGVmYXVsdCBlbXB0eSBzY2VuZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGFwcCkge1xyXG4gICAgdGhpcy5fbGlnaHRzID0gbmV3IEZpeGVkQXJyYXkoMTYpO1xyXG4gICAgdGhpcy5fbW9kZWxzID0gbmV3IEZpeGVkQXJyYXkoMTYpO1xyXG4gICAgdGhpcy5fY2FtZXJhcyA9IG5ldyBGaXhlZEFycmF5KDE2KTtcclxuICAgIHRoaXMuX2RlYnVnQ2FtZXJhID0gbnVsbDtcclxuICAgIHRoaXMuX2FwcCA9IGFwcDtcclxuXHJcbiAgICAvLyBOT1RFOiB3ZSBkb24ndCB1c2UgcG9vbCBmb3Igdmlld3MgKGJlY2F1c2UgaXQncyBsZXNzIGNoYW5nZWQgYW5kIGl0IGRvZXNuJ3QgaGF2ZSBwb29sSUQpXHJcbiAgICB0aGlzLl92aWV3cyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgX2FkZChwb29sLCBpdGVtKSB7XHJcbiAgICBpZiAoaXRlbS5fcG9vbElEICE9PSAtMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcG9vbC5wdXNoKGl0ZW0pO1xyXG4gICAgaXRlbS5fcG9vbElEID0gcG9vbC5sZW5ndGggLSAxO1xyXG4gIH1cclxuXHJcbiAgX3JlbW92ZShwb29sLCBpdGVtKSB7XHJcbiAgICBpZiAoaXRlbS5fcG9vbElEID09PSAtMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcG9vbC5kYXRhW3Bvb2wubGVuZ3RoLTFdLl9wb29sSUQgPSBpdGVtLl9wb29sSUQ7XHJcbiAgICBwb29sLmZhc3RSZW1vdmUoaXRlbS5fcG9vbElEKTtcclxuICAgIGl0ZW0uX3Bvb2xJRCA9IC0xO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmVzZXQgdGhlIG1vZGVsIHZpZXdJRHNcclxuICAgKi9cclxuICByZXNldCgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW9kZWxzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIGxldCBtb2RlbCA9IHRoaXMuX21vZGVscy5kYXRhW2ldO1xyXG4gICAgICBtb2RlbC5fdmlld0lEID0gLTE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGRlYnVnIGNhbWVyYVxyXG4gICAqIEBwYXJhbSB7Q2FtZXJhfSBjYW0gdGhlIGRlYnVnIGNhbWVyYVxyXG4gICAqL1xyXG4gIHNldERlYnVnQ2FtZXJhKGNhbSkge1xyXG4gICAgdGhpcy5fZGVidWdDYW1lcmEgPSBjYW07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGNvdW50IG9mIHJlZ2lzdGVyZWQgY2FtZXJhc1xyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGNhbWVyYSBjb3VudFxyXG4gICAqL1xyXG4gIGdldENhbWVyYUNvdW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NhbWVyYXMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzcGVjaWZpZWQgY2FtZXJhXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkeCBjYW1lcmEgaW5kZXhcclxuICAgKiBAcmV0dXJucyB7Q2FtZXJhfSB0aGUgc3BlY2lmaWVkIGNhbWVyYVxyXG4gICAqL1xyXG4gIGdldENhbWVyYShpZHgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jYW1lcmFzLmRhdGFbaWR4XTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlZ2lzdGVyIGEgY2FtZXJhXHJcbiAgICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSB0aGUgbmV3IGNhbWVyYVxyXG4gICAqL1xyXG4gIGFkZENhbWVyYShjYW1lcmEpIHtcclxuICAgIHRoaXMuX2FkZCh0aGlzLl9jYW1lcmFzLCBjYW1lcmEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmVtb3ZlIGEgY2FtZXJhXHJcbiAgICogQHBhcmFtIHtDYW1lcmF9IGNhbWVyYSB0aGUgY2FtZXJhIHRvIGJlIHJlbW92ZWRcclxuICAgKi9cclxuICByZW1vdmVDYW1lcmEoY2FtZXJhKSB7XHJcbiAgICB0aGlzLl9yZW1vdmUodGhpcy5fY2FtZXJhcywgY2FtZXJhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY291bnQgb2YgcmVnaXN0ZXJlZCBtb2RlbFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IG1vZGVsIGNvdW50XHJcbiAgICovXHJcbiAgZ2V0TW9kZWxDb3VudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9tb2RlbHMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzcGVjaWZpZWQgbW9kZWxcclxuICAgKiBAcGFyYW0ge251bWJlcn0gaWR4IG1vZGVsIGluZGV4XHJcbiAgICogQHJldHVybnMge01vZGVsfSB0aGUgc3BlY2lmaWVkIG1vZGVsXHJcbiAgICovXHJcbiAgZ2V0TW9kZWwoaWR4KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbW9kZWxzLmRhdGFbaWR4XTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlZ2lzdGVyIGEgbW9kZWxcclxuICAgKiBAcGFyYW0ge01vZGVsfSBtb2RlbCB0aGUgbmV3IG1vZGVsXHJcbiAgICovXHJcbiAgYWRkTW9kZWwobW9kZWwpIHtcclxuICAgIHRoaXMuX2FkZCh0aGlzLl9tb2RlbHMsIG1vZGVsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlbW92ZSBhIG1vZGVsXHJcbiAgICogQHBhcmFtIHtNb2RlbH0gbW9kZWwgdGhlIG1vZGVsIHRvIGJlIHJlbW92ZWRcclxuICAgKi9cclxuICByZW1vdmVNb2RlbChtb2RlbCkge1xyXG4gICAgdGhpcy5fcmVtb3ZlKHRoaXMuX21vZGVscywgbW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjb3VudCBvZiByZWdpc3RlcmVkIGxpZ2h0XHJcbiAgICogQHJldHVybnMge251bWJlcn0gbGlnaHQgY291bnRcclxuICAgKi9cclxuICBnZXRMaWdodENvdW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xpZ2h0cy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHNwZWNpZmllZCBsaWdodFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZHggbGlnaHQgaW5kZXhcclxuICAgKiBAcmV0dXJucyB7TGlnaHR9IHRoZSBzcGVjaWZpZWQgbGlnaHRcclxuICAgKi9cclxuICBnZXRMaWdodChpZHgpIHtcclxuICAgIHJldHVybiB0aGlzLl9saWdodHMuZGF0YVtpZHhdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmVnaXN0ZXIgYSBsaWdodFxyXG4gICAqIEBwYXJhbSB7TGlnaHR9IGxpZ2h0IHRoZSBuZXcgbGlnaHRcclxuICAgKi9cclxuICBhZGRMaWdodChsaWdodCkge1xyXG4gICAgdGhpcy5fYWRkKHRoaXMuX2xpZ2h0cywgbGlnaHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmVtb3ZlIGEgbGlnaHRcclxuICAgKiBAcGFyYW0ge0xpZ2h0fSBsaWdodCB0aGUgbGlnaHQgdG8gYmUgcmVtb3ZlZFxyXG4gICAqL1xyXG4gIHJlbW92ZUxpZ2h0KGxpZ2h0KSB7XHJcbiAgICB0aGlzLl9yZW1vdmUodGhpcy5fbGlnaHRzLCBsaWdodCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZWdpc3RlciBhIHZpZXdcclxuICAgKiBAcGFyYW0ge1ZpZXd9IHZpZXcgdGhlIG5ldyB2aWV3XHJcbiAgICovXHJcbiAgYWRkVmlldyh2aWV3KSB7XHJcbiAgICBpZiAodGhpcy5fdmlld3MuaW5kZXhPZih2aWV3KSA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5fdmlld3MucHVzaCh2aWV3KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlbW92ZSBhIHZpZXdcclxuICAgKiBAcGFyYW0ge1ZpZXd9IHZpZXcgdGhlIHZpZXcgdG8gYmUgcmVtb3ZlZFxyXG4gICAqL1xyXG4gIHJlbW92ZVZpZXcodmlldykge1xyXG4gICAgbGV0IGlkeCA9IHRoaXMuX3ZpZXdzLmluZGV4T2Yodmlldyk7XHJcbiAgICBpZiAoaWR4ICE9PSAtMSkge1xyXG4gICAgICB0aGlzLl92aWV3cy5zcGxpY2UoaWR4LCAxKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjZW5lO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==