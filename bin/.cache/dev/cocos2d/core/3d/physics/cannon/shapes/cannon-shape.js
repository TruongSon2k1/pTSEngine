
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/shapes/cannon-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.CannonShape = void 0;

var _cannon = _interopRequireDefault(require("../../../../../../external/cannon/cannon"));

var _util = require("../../framework/util");

var _cannonUtil = require("../cannon-util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TriggerEventObject = {
  type: 'trigger-enter',
  selfCollider: null,
  otherCollider: null
};
var Vec3 = cc.Vec3;
var v3_0 = new Vec3();

var CannonShape = /*#__PURE__*/function () {
  function CannonShape() {
    this._collider = void 0;
    this._shape = void 0;
    this._offset = new _cannon["default"].Vec3();
    this._orient = new _cannon["default"].Quaternion();
    this._index = -1;
    this._sharedBody = void 0;
    this.onTriggerListener = this.onTrigger.bind(this);
  }

  var _proto = CannonShape.prototype;

  /** LIFECYCLE */
  _proto.__preload = function __preload(comp) {
    this._collider = comp;
    (0, _util.setWrap)(this._shape, this);

    this._shape.addEventListener('cc-trigger', this.onTriggerListener);

    this._sharedBody = cc.director.getPhysics3DManager().physicsWorld.getSharedBody(this._collider.node);
    this._sharedBody.reference = true;
  };

  _proto.onLoad = function onLoad() {
    this.center = this._collider.center;
    this.isTrigger = this._collider.isTrigger;
  };

  _proto.onEnable = function onEnable() {
    this._sharedBody.addShape(this);

    this._sharedBody.enabled = true;
  };

  _proto.onDisable = function onDisable() {
    this._sharedBody.removeShape(this);

    this._sharedBody.enabled = false;
  };

  _proto.onDestroy = function onDestroy() {
    this._sharedBody.reference = false;

    this._shape.removeEventListener('cc-trigger', this.onTriggerListener);

    delete _cannon["default"].World['idToShapeMap'][this._shape.id];
    this._sharedBody = null;
    (0, _util.setWrap)(this._shape, null);
    this._offset = null;
    this._orient = null;
    this._shape = null;
    this._collider = null;
    this.onTriggerListener = null;
  }
  /**
   * change scale will recalculate center & size \
   * size handle by child class
   * @param scale 
   */
  ;

  _proto.setScale = function setScale(scale) {
    this._setCenter(this._collider.center);
  };

  _proto.setIndex = function setIndex(index) {
    this._index = index;
  };

  _proto.setOffsetAndOrient = function setOffsetAndOrient(offset, orient) {
    cc.Vec3.copy(offset, this._offset);
    cc.Vec3.copy(orient, this._orient);
    this._offset = offset;
    this._orient = orient;
  };

  _proto._setCenter = function _setCenter(v) {
    var lpos = this._offset;
    Vec3.copy(lpos, v);

    this._collider.node.getWorldScale(v3_0);

    Vec3.multiply(lpos, lpos, v3_0);
  };

  _proto.onTrigger = function onTrigger(event) {
    TriggerEventObject.type = event.event;
    var self = (0, _util.getWrap)(event.selfShape);
    var other = (0, _util.getWrap)(event.otherShape);

    if (self) {
      TriggerEventObject.selfCollider = self.collider;
      TriggerEventObject.otherCollider = other ? other.collider : null;
      TriggerEventObject.type = _cannonUtil.deprecatedEventMap[TriggerEventObject.type];

      this._collider.emit(TriggerEventObject.type, TriggerEventObject); // adapt 


      TriggerEventObject.type = event.event;

      this._collider.emit(TriggerEventObject.type, TriggerEventObject);
    }
  };

  _createClass(CannonShape, [{
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }, {
    key: "attachedRigidBody",
    get: function get() {
      if (this._sharedBody.wrappedBody) {
        return this._sharedBody.wrappedBody.rigidBody;
      }

      return null;
    }
  }, {
    key: "sharedBody",
    get: function get() {
      return this._sharedBody;
    }
  }, {
    key: "material",
    set: function set(mat) {
      if (mat == null) {
        this._shape.material = null;
      } else {
        if (CannonShape.idToMaterial[mat._uuid] == null) {
          CannonShape.idToMaterial[mat._uuid] = new _cannon["default"].Material(mat._uuid);
        }

        this._shape.material = CannonShape.idToMaterial[mat._uuid];
        this._shape.material.friction = mat.friction;
        this._shape.material.restitution = mat.restitution;
      }
    }
  }, {
    key: "isTrigger",
    set: function set(v) {
      this._shape.collisionResponse = !v;

      if (this._index >= 0) {
        this._body.updateHasTrigger();
      }
    }
  }, {
    key: "center",
    set: function set(v) {
      this._setCenter(v);

      if (this._index >= 0) {
        (0, _cannonUtil.commitShapeUpdates)(this._body);
      }
    }
  }, {
    key: "_body",
    get: function get() {
      return this._sharedBody.body;
    }
  }]);

  return CannonShape;
}();

exports.CannonShape = CannonShape;
CannonShape.idToMaterial = {};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjYW5ub25cXHNoYXBlc1xcY2Fubm9uLXNoYXBlLnRzIl0sIm5hbWVzIjpbIlRyaWdnZXJFdmVudE9iamVjdCIsInR5cGUiLCJzZWxmQ29sbGlkZXIiLCJvdGhlckNvbGxpZGVyIiwiVmVjMyIsImNjIiwidjNfMCIsIkNhbm5vblNoYXBlIiwiX2NvbGxpZGVyIiwiX3NoYXBlIiwiX29mZnNldCIsIkNBTk5PTiIsIl9vcmllbnQiLCJRdWF0ZXJuaW9uIiwiX2luZGV4IiwiX3NoYXJlZEJvZHkiLCJvblRyaWdnZXJMaXN0ZW5lciIsIm9uVHJpZ2dlciIsImJpbmQiLCJfX3ByZWxvYWQiLCJjb21wIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljczNETWFuYWdlciIsInBoeXNpY3NXb3JsZCIsImdldFNoYXJlZEJvZHkiLCJub2RlIiwicmVmZXJlbmNlIiwib25Mb2FkIiwiY2VudGVyIiwiaXNUcmlnZ2VyIiwib25FbmFibGUiLCJhZGRTaGFwZSIsImVuYWJsZWQiLCJvbkRpc2FibGUiLCJyZW1vdmVTaGFwZSIsIm9uRGVzdHJveSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJXb3JsZCIsImlkIiwic2V0U2NhbGUiLCJzY2FsZSIsIl9zZXRDZW50ZXIiLCJzZXRJbmRleCIsImluZGV4Iiwic2V0T2Zmc2V0QW5kT3JpZW50Iiwib2Zmc2V0Iiwib3JpZW50IiwiY29weSIsInYiLCJscG9zIiwiZ2V0V29ybGRTY2FsZSIsIm11bHRpcGx5IiwiZXZlbnQiLCJzZWxmIiwic2VsZlNoYXBlIiwib3RoZXIiLCJvdGhlclNoYXBlIiwiY29sbGlkZXIiLCJkZXByZWNhdGVkRXZlbnRNYXAiLCJlbWl0Iiwid3JhcHBlZEJvZHkiLCJyaWdpZEJvZHkiLCJtYXQiLCJtYXRlcmlhbCIsImlkVG9NYXRlcmlhbCIsIl91dWlkIiwiTWF0ZXJpYWwiLCJmcmljdGlvbiIsInJlc3RpdHV0aW9uIiwiY29sbGlzaW9uUmVzcG9uc2UiLCJfYm9keSIsInVwZGF0ZUhhc1RyaWdnZXIiLCJib2R5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOzs7Ozs7OztBQVNBLElBQU1BLGtCQUFrQixHQUFHO0FBQ3ZCQyxFQUFBQSxJQUFJLEVBQUUsZUFEaUI7QUFFdkJDLEVBQUFBLFlBQVksRUFBRSxJQUZTO0FBR3ZCQyxFQUFBQSxhQUFhLEVBQUU7QUFIUSxDQUEzQjtBQU1BLElBQU1DLElBQUksR0FBR0MsRUFBRSxDQUFDRCxJQUFoQjtBQUNBLElBQU1FLElBQUksR0FBRyxJQUFJRixJQUFKLEVBQWI7O0lBRWFHOztTQTJDVEM7U0FFVUM7U0FDQUMsVUFBVSxJQUFJQyxtQkFBT1AsSUFBWDtTQUNWUSxVQUFVLElBQUlELG1CQUFPRSxVQUFYO1NBQ1ZDLFNBQWlCLENBQUM7U0FDbEJDO1NBRUFDLG9CQUFvQixLQUFLQyxTQUFMLENBQWVDLElBQWYsQ0FBb0IsSUFBcEI7Ozs7O0FBRTlCO1NBRUFDLFlBQUEsbUJBQVdDLElBQVgsRUFBNkI7QUFDekIsU0FBS1osU0FBTCxHQUFpQlksSUFBakI7QUFDQSx1QkFBUSxLQUFLWCxNQUFiLEVBQXFCLElBQXJCOztBQUNBLFNBQUtBLE1BQUwsQ0FBWVksZ0JBQVosQ0FBNkIsWUFBN0IsRUFBMkMsS0FBS0wsaUJBQWhEOztBQUNBLFNBQUtELFdBQUwsR0FBb0JWLEVBQUUsQ0FBQ2lCLFFBQUgsQ0FBWUMsbUJBQVosR0FBa0NDLFlBQW5DLENBQWdFQyxhQUFoRSxDQUE4RSxLQUFLakIsU0FBTCxDQUFla0IsSUFBN0YsQ0FBbkI7QUFDQSxTQUFLWCxXQUFMLENBQWlCWSxTQUFqQixHQUE2QixJQUE3QjtBQUNIOztTQUVEQyxTQUFBLGtCQUFVO0FBQ04sU0FBS0MsTUFBTCxHQUFjLEtBQUtyQixTQUFMLENBQWVxQixNQUE3QjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBS3RCLFNBQUwsQ0FBZXNCLFNBQWhDO0FBQ0g7O1NBRURDLFdBQUEsb0JBQVk7QUFDUixTQUFLaEIsV0FBTCxDQUFpQmlCLFFBQWpCLENBQTBCLElBQTFCOztBQUNBLFNBQUtqQixXQUFMLENBQWlCa0IsT0FBakIsR0FBMkIsSUFBM0I7QUFDSDs7U0FFREMsWUFBQSxxQkFBYTtBQUNULFNBQUtuQixXQUFMLENBQWlCb0IsV0FBakIsQ0FBNkIsSUFBN0I7O0FBQ0EsU0FBS3BCLFdBQUwsQ0FBaUJrQixPQUFqQixHQUEyQixLQUEzQjtBQUNIOztTQUVERyxZQUFBLHFCQUFhO0FBQ1QsU0FBS3JCLFdBQUwsQ0FBaUJZLFNBQWpCLEdBQTZCLEtBQTdCOztBQUNBLFNBQUtsQixNQUFMLENBQVk0QixtQkFBWixDQUFnQyxZQUFoQyxFQUE4QyxLQUFLckIsaUJBQW5EOztBQUNBLFdBQU9MLG1CQUFPMkIsS0FBUCxDQUFhLGNBQWIsRUFBNkIsS0FBSzdCLE1BQUwsQ0FBWThCLEVBQXpDLENBQVA7QUFDQyxTQUFLeEIsV0FBTixHQUE0QixJQUE1QjtBQUNBLHVCQUFRLEtBQUtOLE1BQWIsRUFBcUIsSUFBckI7QUFDQyxTQUFLQyxPQUFOLEdBQXdCLElBQXhCO0FBQ0MsU0FBS0UsT0FBTixHQUF3QixJQUF4QjtBQUNDLFNBQUtILE1BQU4sR0FBdUIsSUFBdkI7QUFDQyxTQUFLRCxTQUFOLEdBQTBCLElBQTFCO0FBQ0MsU0FBS1EsaUJBQU4sR0FBa0MsSUFBbEM7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7OztTQUNJd0IsV0FBQSxrQkFBVUMsS0FBVixFQUE0QjtBQUN4QixTQUFLQyxVQUFMLENBQWdCLEtBQUtsQyxTQUFMLENBQWVxQixNQUEvQjtBQUNIOztTQUVEYyxXQUFBLGtCQUFVQyxLQUFWLEVBQXlCO0FBQ3JCLFNBQUs5QixNQUFMLEdBQWM4QixLQUFkO0FBQ0g7O1NBRURDLHFCQUFBLDRCQUFvQkMsTUFBcEIsRUFBeUNDLE1BQXpDLEVBQW9FO0FBQ2hFMUMsSUFBQUEsRUFBRSxDQUFDRCxJQUFILENBQVE0QyxJQUFSLENBQWFGLE1BQWIsRUFBcUIsS0FBS3BDLE9BQTFCO0FBQ0FMLElBQUFBLEVBQUUsQ0FBQ0QsSUFBSCxDQUFRNEMsSUFBUixDQUFhRCxNQUFiLEVBQXFCLEtBQUtuQyxPQUExQjtBQUNBLFNBQUtGLE9BQUwsR0FBZW9DLE1BQWY7QUFDQSxTQUFLbEMsT0FBTCxHQUFlbUMsTUFBZjtBQUNIOztTQUVTTCxhQUFWLG9CQUFzQk8sQ0FBdEIsRUFBb0M7QUFDaEMsUUFBTUMsSUFBSSxHQUFHLEtBQUt4QyxPQUFsQjtBQUNBTixJQUFBQSxJQUFJLENBQUM0QyxJQUFMLENBQVVFLElBQVYsRUFBZ0JELENBQWhCOztBQUNBLFNBQUt6QyxTQUFMLENBQWVrQixJQUFmLENBQW9CeUIsYUFBcEIsQ0FBa0M3QyxJQUFsQzs7QUFDQUYsSUFBQUEsSUFBSSxDQUFDZ0QsUUFBTCxDQUFjRixJQUFkLEVBQW9CQSxJQUFwQixFQUEwQjVDLElBQTFCO0FBQ0g7O1NBRU9XLFlBQVIsbUJBQW1Cb0MsS0FBbkIsRUFBa0Q7QUFDOUNyRCxJQUFBQSxrQkFBa0IsQ0FBQ0MsSUFBbkIsR0FBMEJvRCxLQUFLLENBQUNBLEtBQWhDO0FBQ0EsUUFBTUMsSUFBSSxHQUFHLG1CQUFxQkQsS0FBSyxDQUFDRSxTQUEzQixDQUFiO0FBQ0EsUUFBTUMsS0FBSyxHQUFHLG1CQUFxQkgsS0FBSyxDQUFDSSxVQUEzQixDQUFkOztBQUVBLFFBQUlILElBQUosRUFBVTtBQUNOdEQsTUFBQUEsa0JBQWtCLENBQUNFLFlBQW5CLEdBQWtDb0QsSUFBSSxDQUFDSSxRQUF2QztBQUNBMUQsTUFBQUEsa0JBQWtCLENBQUNHLGFBQW5CLEdBQW1DcUQsS0FBSyxHQUFHQSxLQUFLLENBQUNFLFFBQVQsR0FBb0IsSUFBNUQ7QUFDQTFELE1BQUFBLGtCQUFrQixDQUFDQyxJQUFuQixHQUEwQjBELCtCQUFtQjNELGtCQUFrQixDQUFDQyxJQUF0QyxDQUExQjs7QUFDQSxXQUFLTyxTQUFMLENBQWVvRCxJQUFmLENBQW9CNUQsa0JBQWtCLENBQUNDLElBQXZDLEVBQTZDRCxrQkFBN0MsRUFKTSxDQUtOOzs7QUFDQUEsTUFBQUEsa0JBQWtCLENBQUNDLElBQW5CLEdBQTBCb0QsS0FBSyxDQUFDQSxLQUFoQzs7QUFDQSxXQUFLN0MsU0FBTCxDQUFlb0QsSUFBZixDQUFvQjVELGtCQUFrQixDQUFDQyxJQUF2QyxFQUE2Q0Qsa0JBQTdDO0FBQ0g7QUFDSjs7OztTQWhJRCxlQUFhO0FBQUUsYUFBTyxLQUFLUyxNQUFaO0FBQXNCOzs7U0FFckMsZUFBZ0I7QUFBRSxhQUFPLEtBQUtELFNBQVo7QUFBd0I7OztTQUUxQyxlQUF5QjtBQUNyQixVQUFJLEtBQUtPLFdBQUwsQ0FBaUI4QyxXQUFyQixFQUFrQztBQUFFLGVBQU8sS0FBSzlDLFdBQUwsQ0FBaUI4QyxXQUFqQixDQUE2QkMsU0FBcEM7QUFBZ0Q7O0FBQ3BGLGFBQU8sSUFBUDtBQUNIOzs7U0FFRCxlQUFvQztBQUFFLGFBQU8sS0FBSy9DLFdBQVo7QUFBMEI7OztTQUVoRSxhQUFjZ0QsR0FBZCxFQUFvQztBQUNoQyxVQUFJQSxHQUFHLElBQUksSUFBWCxFQUFpQjtBQUNaLGFBQUt0RCxNQUFMLENBQWF1RCxRQUFkLEdBQXFDLElBQXJDO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsWUFBSXpELFdBQVcsQ0FBQzBELFlBQVosQ0FBeUJGLEdBQUcsQ0FBQ0csS0FBN0IsS0FBdUMsSUFBM0MsRUFBaUQ7QUFDN0MzRCxVQUFBQSxXQUFXLENBQUMwRCxZQUFaLENBQXlCRixHQUFHLENBQUNHLEtBQTdCLElBQXNDLElBQUl2RCxtQkFBT3dELFFBQVgsQ0FBb0JKLEdBQUcsQ0FBQ0csS0FBeEIsQ0FBdEM7QUFDSDs7QUFFRCxhQUFLekQsTUFBTCxDQUFhdUQsUUFBYixHQUF3QnpELFdBQVcsQ0FBQzBELFlBQVosQ0FBeUJGLEdBQUcsQ0FBQ0csS0FBN0IsQ0FBeEI7QUFDQSxhQUFLekQsTUFBTCxDQUFhdUQsUUFBYixDQUFzQkksUUFBdEIsR0FBaUNMLEdBQUcsQ0FBQ0ssUUFBckM7QUFDQSxhQUFLM0QsTUFBTCxDQUFhdUQsUUFBYixDQUFzQkssV0FBdEIsR0FBb0NOLEdBQUcsQ0FBQ00sV0FBeEM7QUFDSDtBQUNKOzs7U0FFRCxhQUFlcEIsQ0FBZixFQUEyQjtBQUN2QixXQUFLeEMsTUFBTCxDQUFZNkQsaUJBQVosR0FBZ0MsQ0FBQ3JCLENBQWpDOztBQUNBLFVBQUksS0FBS25DLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNsQixhQUFLeUQsS0FBTCxDQUFXQyxnQkFBWDtBQUNIO0FBQ0o7OztTQUVELGFBQVl2QixDQUFaLEVBQTBCO0FBQ3RCLFdBQUtQLFVBQUwsQ0FBZ0JPLENBQWhCOztBQUNBLFVBQUksS0FBS25DLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNsQiw0Q0FBbUIsS0FBS3lELEtBQXhCO0FBQ0g7QUFDSjs7O1NBU0QsZUFBb0M7QUFBRSxhQUFPLEtBQUt4RCxXQUFMLENBQWlCMEQsSUFBeEI7QUFBK0I7Ozs7Ozs7QUFsRDVEbEUsWUFFTzBELGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgQ0FOTk9OIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL2Nhbm5vbi9jYW5ub24nO1xyXG5pbXBvcnQgeyBnZXRXcmFwLCBzZXRXcmFwIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL3V0aWwnO1xyXG5pbXBvcnQgeyBjb21taXRTaGFwZVVwZGF0ZXMsIGRlcHJlY2F0ZWRFdmVudE1hcCB9IGZyb20gJy4uL2Nhbm5vbi11dGlsJztcclxuaW1wb3J0IHsgUGh5c2ljc01hdGVyaWFsIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2Fzc2V0cy9waHlzaWNzLW1hdGVyaWFsJztcclxuaW1wb3J0IHsgSUJhc2VTaGFwZSB9IGZyb20gJy4uLy4uL3NwZWMvaS1waHlzaWNzLXNoYXBlJztcclxuaW1wb3J0IHsgSVZlYzNMaWtlIH0gZnJvbSAnLi4vLi4vc3BlYy9pLWNvbW1vbic7XHJcbmltcG9ydCB7IENhbm5vblNoYXJlZEJvZHkgfSBmcm9tICcuLi9jYW5ub24tc2hhcmVkLWJvZHknO1xyXG5pbXBvcnQgeyBDYW5ub25Xb3JsZCB9IGZyb20gJy4uL2Nhbm5vbi13b3JsZCc7XHJcbmltcG9ydCB7IFRyaWdnZXJFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvcGh5c2ljcy1pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb2xsaWRlcjNEIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrJztcclxuXHJcbmNvbnN0IFRyaWdnZXJFdmVudE9iamVjdCA9IHtcclxuICAgIHR5cGU6ICd0cmlnZ2VyLWVudGVyJyBhcyBUcmlnZ2VyRXZlbnRUeXBlLFxyXG4gICAgc2VsZkNvbGxpZGVyOiBudWxsIGFzIENvbGxpZGVyM0QgfCBudWxsLFxyXG4gICAgb3RoZXJDb2xsaWRlcjogbnVsbCBhcyBDb2xsaWRlcjNEIHwgbnVsbCxcclxufTtcclxuXHJcbmNvbnN0IFZlYzMgPSBjYy5WZWMzO1xyXG5jb25zdCB2M18wID0gbmV3IFZlYzMoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYW5ub25TaGFwZSBpbXBsZW1lbnRzIElCYXNlU2hhcGUge1xyXG5cclxuICAgIHN0YXRpYyByZWFkb25seSBpZFRvTWF0ZXJpYWwgPSB7fTtcclxuXHJcbiAgICBnZXQgc2hhcGUgKCkgeyByZXR1cm4gdGhpcy5fc2hhcGUhOyB9XHJcblxyXG4gICAgZ2V0IGNvbGxpZGVyICgpIHsgcmV0dXJuIHRoaXMuX2NvbGxpZGVyOyB9XHJcblxyXG4gICAgZ2V0IGF0dGFjaGVkUmlnaWRCb2R5ICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hhcmVkQm9keS53cmFwcGVkQm9keSkgeyByZXR1cm4gdGhpcy5fc2hhcmVkQm9keS53cmFwcGVkQm9keS5yaWdpZEJvZHk7IH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2hhcmVkQm9keSAoKTogQ2Fubm9uU2hhcmVkQm9keSB7IHJldHVybiB0aGlzLl9zaGFyZWRCb2R5OyB9XHJcblxyXG4gICAgc2V0IG1hdGVyaWFsIChtYXQ6IFBoeXNpY3NNYXRlcmlhbCkge1xyXG4gICAgICAgIGlmIChtYXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAodGhpcy5fc2hhcGUhLm1hdGVyaWFsIGFzIHVua25vd24pID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoQ2Fubm9uU2hhcGUuaWRUb01hdGVyaWFsW21hdC5fdXVpZF0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgQ2Fubm9uU2hhcGUuaWRUb01hdGVyaWFsW21hdC5fdXVpZF0gPSBuZXcgQ0FOTk9OLk1hdGVyaWFsKG1hdC5fdXVpZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlIS5tYXRlcmlhbCA9IENhbm5vblNoYXBlLmlkVG9NYXRlcmlhbFttYXQuX3V1aWRdO1xyXG4gICAgICAgICAgICB0aGlzLl9zaGFwZSEubWF0ZXJpYWwuZnJpY3Rpb24gPSBtYXQuZnJpY3Rpb247XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlIS5tYXRlcmlhbC5yZXN0aXR1dGlvbiA9IG1hdC5yZXN0aXR1dGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGlzVHJpZ2dlciAodjogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3NoYXBlLmNvbGxpc2lvblJlc3BvbnNlID0gIXY7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luZGV4ID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fYm9keS51cGRhdGVIYXNUcmlnZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBjZW50ZXIgKHY6IElWZWMzTGlrZSkge1xyXG4gICAgICAgIHRoaXMuX3NldENlbnRlcih2KTtcclxuICAgICAgICBpZiAodGhpcy5faW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBjb21taXRTaGFwZVVwZGF0ZXModGhpcy5fYm9keSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jb2xsaWRlciE6IENvbGxpZGVyM0Q7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9zaGFwZSE6IENBTk5PTi5TaGFwZTtcclxuICAgIHByb3RlY3RlZCBfb2Zmc2V0ID0gbmV3IENBTk5PTi5WZWMzKCk7XHJcbiAgICBwcm90ZWN0ZWQgX29yaWVudCA9IG5ldyBDQU5OT04uUXVhdGVybmlvbigpO1xyXG4gICAgcHJvdGVjdGVkIF9pbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICBwcm90ZWN0ZWQgX3NoYXJlZEJvZHkhOiBDYW5ub25TaGFyZWRCb2R5O1xyXG4gICAgcHJvdGVjdGVkIGdldCBfYm9keSAoKTogQ0FOTk9OLkJvZHkgeyByZXR1cm4gdGhpcy5fc2hhcmVkQm9keS5ib2R5OyB9XHJcbiAgICBwcm90ZWN0ZWQgb25UcmlnZ2VyTGlzdGVuZXIgPSB0aGlzLm9uVHJpZ2dlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgIC8qKiBMSUZFQ1lDTEUgKi9cclxuXHJcbiAgICBfX3ByZWxvYWQgKGNvbXA6IENvbGxpZGVyM0QpIHtcclxuICAgICAgICB0aGlzLl9jb2xsaWRlciA9IGNvbXA7XHJcbiAgICAgICAgc2V0V3JhcCh0aGlzLl9zaGFwZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fc2hhcGUuYWRkRXZlbnRMaXN0ZW5lcignY2MtdHJpZ2dlcicsIHRoaXMub25UcmlnZ2VyTGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkgPSAoY2MuZGlyZWN0b3IuZ2V0UGh5c2ljczNETWFuYWdlcigpLnBoeXNpY3NXb3JsZCBhcyBDYW5ub25Xb3JsZCkuZ2V0U2hhcmVkQm9keSh0aGlzLl9jb2xsaWRlci5ub2RlKTtcclxuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5LnJlZmVyZW5jZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLmNlbnRlciA9IHRoaXMuX2NvbGxpZGVyLmNlbnRlcjtcclxuICAgICAgICB0aGlzLmlzVHJpZ2dlciA9IHRoaXMuX2NvbGxpZGVyLmlzVHJpZ2dlcjtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5hZGRTaGFwZSh0aGlzKTtcclxuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5LmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5yZW1vdmVTaGFwZSh0aGlzKTtcclxuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3kgKCkge1xyXG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkucmVmZXJlbmNlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hhcGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2MtdHJpZ2dlcicsIHRoaXMub25UcmlnZ2VyTGlzdGVuZXIpO1xyXG4gICAgICAgIGRlbGV0ZSBDQU5OT04uV29ybGRbJ2lkVG9TaGFwZU1hcCddW3RoaXMuX3NoYXBlLmlkXTtcclxuICAgICAgICAodGhpcy5fc2hhcmVkQm9keSBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICBzZXRXcmFwKHRoaXMuX3NoYXBlLCBudWxsKTtcclxuICAgICAgICAodGhpcy5fb2Zmc2V0IGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLl9vcmllbnQgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMuX3NoYXBlIGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLl9jb2xsaWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy5vblRyaWdnZXJMaXN0ZW5lciBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoYW5nZSBzY2FsZSB3aWxsIHJlY2FsY3VsYXRlIGNlbnRlciAmIHNpemUgXFxcclxuICAgICAqIHNpemUgaGFuZGxlIGJ5IGNoaWxkIGNsYXNzXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUgXHJcbiAgICAgKi9cclxuICAgIHNldFNjYWxlIChzY2FsZTogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0Q2VudGVyKHRoaXMuX2NvbGxpZGVyLmNlbnRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5kZXggKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHNldE9mZnNldEFuZE9yaWVudCAob2Zmc2V0OiBDQU5OT04uVmVjMywgb3JpZW50OiBDQU5OT04uUXVhdGVybmlvbikge1xyXG4gICAgICAgIGNjLlZlYzMuY29weShvZmZzZXQsIHRoaXMuX29mZnNldCk7XHJcbiAgICAgICAgY2MuVmVjMy5jb3B5KG9yaWVudCwgdGhpcy5fb3JpZW50KTtcclxuICAgICAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgdGhpcy5fb3JpZW50ID0gb3JpZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfc2V0Q2VudGVyICh2OiBJVmVjM0xpa2UpIHtcclxuICAgICAgICBjb25zdCBscG9zID0gdGhpcy5fb2Zmc2V0IGFzIElWZWMzTGlrZTtcclxuICAgICAgICBWZWMzLmNvcHkobHBvcywgdik7XHJcbiAgICAgICAgdGhpcy5fY29sbGlkZXIubm9kZS5nZXRXb3JsZFNjYWxlKHYzXzApO1xyXG4gICAgICAgIFZlYzMubXVsdGlwbHkobHBvcywgbHBvcywgdjNfMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRyaWdnZXIgKGV2ZW50OiBDQU5OT04uSVRyaWdnZXJlZEV2ZW50KSB7XHJcbiAgICAgICAgVHJpZ2dlckV2ZW50T2JqZWN0LnR5cGUgPSBldmVudC5ldmVudDtcclxuICAgICAgICBjb25zdCBzZWxmID0gZ2V0V3JhcDxDYW5ub25TaGFwZT4oZXZlbnQuc2VsZlNoYXBlKTtcclxuICAgICAgICBjb25zdCBvdGhlciA9IGdldFdyYXA8Q2Fubm9uU2hhcGU+KGV2ZW50Lm90aGVyU2hhcGUpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZikge1xyXG4gICAgICAgICAgICBUcmlnZ2VyRXZlbnRPYmplY3Quc2VsZkNvbGxpZGVyID0gc2VsZi5jb2xsaWRlcjtcclxuICAgICAgICAgICAgVHJpZ2dlckV2ZW50T2JqZWN0Lm90aGVyQ29sbGlkZXIgPSBvdGhlciA/IG90aGVyLmNvbGxpZGVyIDogbnVsbDtcclxuICAgICAgICAgICAgVHJpZ2dlckV2ZW50T2JqZWN0LnR5cGUgPSBkZXByZWNhdGVkRXZlbnRNYXBbVHJpZ2dlckV2ZW50T2JqZWN0LnR5cGVdO1xyXG4gICAgICAgICAgICB0aGlzLl9jb2xsaWRlci5lbWl0KFRyaWdnZXJFdmVudE9iamVjdC50eXBlLCBUcmlnZ2VyRXZlbnRPYmplY3QpO1xyXG4gICAgICAgICAgICAvLyBhZGFwdCBcclxuICAgICAgICAgICAgVHJpZ2dlckV2ZW50T2JqZWN0LnR5cGUgPSBldmVudC5ldmVudDtcclxuICAgICAgICAgICAgdGhpcy5fY29sbGlkZXIuZW1pdChUcmlnZ2VyRXZlbnRPYmplY3QudHlwZSwgVHJpZ2dlckV2ZW50T2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=