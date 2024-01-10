
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/assets/physics-material.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.PhysicsMaterial = void 0;

var _dec, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var _cc$_decorator = cc._decorator,
    ccclass = _cc$_decorator.ccclass,
    property = _cc$_decorator.property;
var fastRemove = cc.js.array.fastRemove;
var equals = cc.math.equals;
/**
 * !#en
 * Physics material.
 * !#zh
 * 物理材质。
 * @class PhysicsMaterial
 * @extends Asset
 */

var PhysicsMaterial = (_dec = ccclass('cc.PhysicsMaterial'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_cc$Asset) {
  _inheritsLoose(PhysicsMaterial, _cc$Asset);

  function PhysicsMaterial() {
    var _this;

    _this = _cc$Asset.call(this) || this;

    _initializerDefineProperty(_this, "_friction", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_restitution", _descriptor2, _assertThisInitialized(_this));

    cc.EventTarget.call(_assertThisInitialized(_this));
    PhysicsMaterial.allMaterials.push(_assertThisInitialized(_this));

    if (_this._uuid == '') {
      _this._uuid = 'pm_' + PhysicsMaterial._idCounter++;
    }

    return _this;
  }

  var _proto = PhysicsMaterial.prototype;

  _proto.clone = function clone() {
    var c = new PhysicsMaterial();
    c._friction = this._friction;
    c._restitution = this._restitution;
    return c;
  };

  _proto.destroy = function destroy() {
    if (_cc$Asset.prototype.destroy.call(this)) {
      fastRemove(PhysicsMaterial.allMaterials, this);
      return true;
    } else {
      return false;
    }
  };

  _createClass(PhysicsMaterial, [{
    key: "friction",
    get:
    /**
     * !#en
     * Friction for this material.
     * !#zh
     * 物理材质的摩擦力。
     * @property {number} friction
     */
    function get() {
      return this._friction;
    },
    set: function set(value) {
      if (!equals(this._friction, value)) {
        this._friction = value;
        this.emit('physics_material_update');
      }
    }
    /**
     * !#en
     * Restitution for this material.
     * !#zh
     * 物理材质的弹力。
     * @property {number} restitution
     */

  }, {
    key: "restitution",
    get: function get() {
      return this._restitution;
    },
    set: function set(value) {
      if (!equals(this._restitution, value)) {
        this._restitution = value;
        this.emit('physics_material_update');
      }
    }
  }]);

  return PhysicsMaterial;
}(cc.Asset), _class3.allMaterials = [], _class3._idCounter = 0, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_friction", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_restitution", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "friction", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "friction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "restitution", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "restitution"), _class2.prototype)), _class2)) || _class);
exports.PhysicsMaterial = PhysicsMaterial;
cc.js.mixin(PhysicsMaterial.prototype, cc.EventTarget.prototype);
cc.PhysicsMaterial = PhysicsMaterial;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxmcmFtZXdvcmtcXGFzc2V0c1xccGh5c2ljcy1tYXRlcmlhbC50cyJdLCJuYW1lcyI6WyJjYyIsIl9kZWNvcmF0b3IiLCJjY2NsYXNzIiwicHJvcGVydHkiLCJmYXN0UmVtb3ZlIiwianMiLCJhcnJheSIsImVxdWFscyIsIm1hdGgiLCJQaHlzaWNzTWF0ZXJpYWwiLCJFdmVudFRhcmdldCIsImNhbGwiLCJhbGxNYXRlcmlhbHMiLCJwdXNoIiwiX3V1aWQiLCJfaWRDb3VudGVyIiwiY2xvbmUiLCJjIiwiX2ZyaWN0aW9uIiwiX3Jlc3RpdHV0aW9uIiwiZGVzdHJveSIsInZhbHVlIiwiZW1pdCIsIkFzc2V0IiwibWl4aW4iLCJwcm90b3R5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7cUJBRTRCQSxFQUFFLENBQUNDO0lBQXhCQyx5QkFBQUE7SUFBU0MsMEJBQUFBO0FBQ2hCLElBQU1DLFVBQVUsR0FBR0osRUFBRSxDQUFDSyxFQUFILENBQU1DLEtBQU4sQ0FBWUYsVUFBL0I7QUFDQSxJQUFNRyxNQUFNLEdBQUdQLEVBQUUsQ0FBQ1EsSUFBSCxDQUFRRCxNQUF2QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRWFFLDBCQURaUCxPQUFPLENBQUMsb0JBQUQ7OztBQW1ESiw2QkFBZTtBQUFBOztBQUNYOztBQURXOztBQUFBOztBQUVYRixJQUFBQSxFQUFFLENBQUNVLFdBQUgsQ0FBZUMsSUFBZjtBQUNBRixJQUFBQSxlQUFlLENBQUNHLFlBQWhCLENBQTZCQyxJQUE3Qjs7QUFDQSxRQUFJLE1BQUtDLEtBQUwsSUFBYyxFQUFsQixFQUFzQjtBQUNsQixZQUFLQSxLQUFMLEdBQWEsUUFBUUwsZUFBZSxDQUFDTSxVQUFoQixFQUFyQjtBQUNIOztBQU5VO0FBT2Q7Ozs7U0FFTUMsUUFBUCxpQkFBZ0I7QUFDWixRQUFJQyxDQUFDLEdBQUcsSUFBSVIsZUFBSixFQUFSO0FBQ0FRLElBQUFBLENBQUMsQ0FBQ0MsU0FBRixHQUFjLEtBQUtBLFNBQW5CO0FBQ0FELElBQUFBLENBQUMsQ0FBQ0UsWUFBRixHQUFpQixLQUFLQSxZQUF0QjtBQUNBLFdBQU9GLENBQVA7QUFDSDs7U0FFTUcsVUFBUCxtQkFBMkI7QUFDdkIsNEJBQVVBLE9BQVYsYUFBcUI7QUFDakJoQixNQUFBQSxVQUFVLENBQUNLLGVBQWUsQ0FBQ0csWUFBakIsRUFBK0IsSUFBL0IsQ0FBVjtBQUNBLGFBQU8sSUFBUDtBQUNILEtBSEQsTUFHTztBQUNILGFBQU8sS0FBUDtBQUNIO0FBQ0o7Ozs7O0FBN0REO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksbUJBQ2dCO0FBQ1osYUFBTyxLQUFLTSxTQUFaO0FBQ0g7U0FFRCxhQUFjRyxLQUFkLEVBQXFCO0FBQ2pCLFVBQUksQ0FBQ2QsTUFBTSxDQUFDLEtBQUtXLFNBQU4sRUFBaUJHLEtBQWpCLENBQVgsRUFBb0M7QUFDaEMsYUFBS0gsU0FBTCxHQUFpQkcsS0FBakI7QUFDQSxhQUFLQyxJQUFMLENBQVUseUJBQVY7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSSxlQUNtQjtBQUNmLGFBQU8sS0FBS0gsWUFBWjtBQUNIO1NBRUQsYUFBaUJFLEtBQWpCLEVBQXdCO0FBQ3BCLFVBQUksQ0FBQ2QsTUFBTSxDQUFDLEtBQUtZLFlBQU4sRUFBb0JFLEtBQXBCLENBQVgsRUFBdUM7QUFDbkMsYUFBS0YsWUFBTCxHQUFvQkUsS0FBcEI7QUFDQSxhQUFLQyxJQUFMLENBQVUseUJBQVY7QUFDSDtBQUNKOzs7O0VBaERnQ3RCLEVBQUUsQ0FBQ3VCLGdCQUV0QlgsZUFBa0MsWUFFakNHLGFBQXFCLHFGQUVuQ1o7Ozs7O1dBQ21COztpRkFFbkJBOzs7OztXQUNzQjs7OERBU3RCQSw0SkFtQkFBOztBQXVDTEgsRUFBRSxDQUFDSyxFQUFILENBQU1tQixLQUFOLENBQVlmLGVBQWUsQ0FBQ2dCLFNBQTVCLEVBQXVDekIsRUFBRSxDQUFDVSxXQUFILENBQWVlLFNBQXREO0FBQ0F6QixFQUFFLENBQUNTLGVBQUgsR0FBcUJBLGVBQXJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbmNvbnN0IGZhc3RSZW1vdmUgPSBjYy5qcy5hcnJheS5mYXN0UmVtb3ZlO1xyXG5jb25zdCBlcXVhbHMgPSBjYy5tYXRoLmVxdWFscztcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFBoeXNpY3MgbWF0ZXJpYWwuXHJcbiAqICEjemhcclxuICog54mp55CG5p2Q6LSo44CCXHJcbiAqIEBjbGFzcyBQaHlzaWNzTWF0ZXJpYWxcclxuICogQGV4dGVuZHMgQXNzZXRcclxuICovXHJcbkBjY2NsYXNzKCdjYy5QaHlzaWNzTWF0ZXJpYWwnKVxyXG5leHBvcnQgY2xhc3MgUGh5c2ljc01hdGVyaWFsIGV4dGVuZHMgY2MuQXNzZXQge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYWxsTWF0ZXJpYWxzOiBQaHlzaWNzTWF0ZXJpYWxbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pZENvdW50ZXI6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9mcmljdGlvbiA9IDAuMTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX3Jlc3RpdHV0aW9uID0gMC4xO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogRnJpY3Rpb24gZm9yIHRoaXMgbWF0ZXJpYWwuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDniannkIbmnZDotKjnmoTmkanmk6blipvjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBmcmljdGlvblxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGdldCBmcmljdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyaWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBmcmljdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAoIWVxdWFscyh0aGlzLl9mcmljdGlvbiwgdmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyaWN0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncGh5c2ljc19tYXRlcmlhbF91cGRhdGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBSZXN0aXR1dGlvbiBmb3IgdGhpcyBtYXRlcmlhbC5cclxuICAgICAqICEjemhcclxuICAgICAqIOeJqeeQhuadkOi0qOeahOW8ueWKm+OAglxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHJlc3RpdHV0aW9uXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZ2V0IHJlc3RpdHV0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVzdGl0dXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHJlc3RpdHV0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICghZXF1YWxzKHRoaXMuX3Jlc3RpdHV0aW9uLCB2YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVzdGl0dXRpb24gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdwaHlzaWNzX21hdGVyaWFsX3VwZGF0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBjYy5FdmVudFRhcmdldC5jYWxsKHRoaXMpO1xyXG4gICAgICAgIFBoeXNpY3NNYXRlcmlhbC5hbGxNYXRlcmlhbHMucHVzaCh0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5fdXVpZCA9PSAnJykge1xyXG4gICAgICAgICAgICB0aGlzLl91dWlkID0gJ3BtXycgKyBQaHlzaWNzTWF0ZXJpYWwuX2lkQ291bnRlcisrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvbmUgKCkge1xyXG4gICAgICAgIGxldCBjID0gbmV3IFBoeXNpY3NNYXRlcmlhbCgpO1xyXG4gICAgICAgIGMuX2ZyaWN0aW9uID0gdGhpcy5fZnJpY3Rpb247XHJcbiAgICAgICAgYy5fcmVzdGl0dXRpb24gPSB0aGlzLl9yZXN0aXR1dGlvbjtcclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSAoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHN1cGVyLmRlc3Ryb3koKSkge1xyXG4gICAgICAgICAgICBmYXN0UmVtb3ZlKFBoeXNpY3NNYXRlcmlhbC5hbGxNYXRlcmlhbHMsIHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuY2MuanMubWl4aW4oUGh5c2ljc01hdGVyaWFsLnByb3RvdHlwZSwgY2MuRXZlbnRUYXJnZXQucHJvdG90eXBlKTtcclxuY2MuUGh5c2ljc01hdGVyaWFsID0gUGh5c2ljc01hdGVyaWFsO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==