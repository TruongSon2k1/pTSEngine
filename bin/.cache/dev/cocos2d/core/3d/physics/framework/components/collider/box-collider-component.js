
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/components/collider/box-collider-component.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.BoxCollider3D = void 0;

var _instance = require("../../instance");

var _colliderComponent = require("./collider-component");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var _cc$_decorator = cc._decorator,
    ccclass = _cc$_decorator.ccclass,
    executeInEditMode = _cc$_decorator.executeInEditMode,
    executionOrder = _cc$_decorator.executionOrder,
    menu = _cc$_decorator.menu,
    property = _cc$_decorator.property;
var Vec3 = cc.Vec3;
/**
 * !#en
 * Physics box collider
 * !#zh
 * 物理盒子碰撞器
 * @class BoxCollider3D
 * @extends Collider3D
 */

var BoxCollider3D = (_dec = ccclass('cc.BoxCollider3D'), _dec2 = executionOrder(98), _dec3 = menu('i18n:MAIN_MENU.component.physics/Collider/Box 3D'), _dec4 = property({
  type: cc.Vec3
}), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Collider3D) {
  _inheritsLoose(BoxCollider3D, _Collider3D);

  function BoxCollider3D() {
    var _this;

    _this = _Collider3D.call(this) || this;

    _initializerDefineProperty(_this, "_size", _descriptor, _assertThisInitialized(_this));

    if (!CC_EDITOR) {
      _this._shape = (0, _instance.createBoxShape)(_this._size);
    }

    return _this;
  }

  _createClass(BoxCollider3D, [{
    key: "size",
    get: /// PUBLIC PROPERTY GETTER\SETTER ///

    /**
     * !#en
     * Get or set the size of the box, in local space.
     * !#zh
     * 获取或设置盒的大小。
     * @property {Vec3} size
     */
    function get() {
      return this._size;
    },
    set: function set(value) {
      Vec3.copy(this._size, value);

      if (!CC_EDITOR) {
        this.boxShape.size = this._size;
      }
    }
    /**
     * @property {IBoxShape} boxShape
     * @readonly
     */

  }, {
    key: "boxShape",
    get: function get() {
      return this._shape;
    } /// PRIVATE PROPERTY ///

  }]);

  return BoxCollider3D;
}(_colliderComponent.Collider3D), _temp), (_applyDecoratedDescriptor(_class2.prototype, "size", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "size"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_size", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3(1, 1, 1);
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.BoxCollider3D = BoxCollider3D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxmcmFtZXdvcmtcXGNvbXBvbmVudHNcXGNvbGxpZGVyXFxib3gtY29sbGlkZXItY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbImNjIiwiX2RlY29yYXRvciIsImNjY2xhc3MiLCJleGVjdXRlSW5FZGl0TW9kZSIsImV4ZWN1dGlvbk9yZGVyIiwibWVudSIsInByb3BlcnR5IiwiVmVjMyIsIkJveENvbGxpZGVyM0QiLCJ0eXBlIiwiQ0NfRURJVE9SIiwiX3NoYXBlIiwiX3NpemUiLCJ2YWx1ZSIsImNvcHkiLCJib3hTaGFwZSIsInNpemUiLCJDb2xsaWRlcjNEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFTSUEsRUFBRSxDQUFDQztJQUxIQyx5QkFBQUE7SUFDQUMsbUNBQUFBO0lBQ0FDLGdDQUFBQTtJQUNBQyxzQkFBQUE7SUFDQUMsMEJBQUFBO0FBR0osSUFBTUMsSUFBSSxHQUFHUCxFQUFFLENBQUNPLElBQWhCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFLYUMsd0JBSlpOLE9BQU8sQ0FBQyxrQkFBRCxXQUNQRSxjQUFjLENBQUMsRUFBRCxXQUNkQyxJQUFJLENBQUMsa0RBQUQsV0FhQUMsUUFBUSxDQUFDO0FBQ05HLEVBQUFBLElBQUksRUFBRVQsRUFBRSxDQUFDTztBQURILENBQUQsK0NBWlpKOzs7QUF1Q0csMkJBQWU7QUFBQTs7QUFDWDs7QUFEVzs7QUFFWCxRQUFJLENBQUNPLFNBQUwsRUFBZ0I7QUFDWixZQUFLQyxNQUFMLEdBQWMsOEJBQWUsTUFBS0MsS0FBcEIsQ0FBZDtBQUNIOztBQUpVO0FBS2Q7Ozs7U0F6Q0Q7O0FBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSxtQkFHbUI7QUFDZixhQUFPLEtBQUtBLEtBQVo7QUFDSDtTQUVELGFBQWlCQyxLQUFqQixFQUF3QjtBQUNwQk4sTUFBQUEsSUFBSSxDQUFDTyxJQUFMLENBQVUsS0FBS0YsS0FBZixFQUFzQkMsS0FBdEI7O0FBQ0EsVUFBSSxDQUFDSCxTQUFMLEVBQWdCO0FBQ1osYUFBS0ssUUFBTCxDQUFjQyxJQUFkLEdBQXFCLEtBQUtKLEtBQTFCO0FBQ0g7QUFDSjtBQUVEO0FBQ0o7QUFDQTtBQUNBOzs7O1NBQ0ksZUFBa0M7QUFDOUIsYUFBTyxLQUFLRCxNQUFaO0FBQ0gsTUFFRDs7Ozs7RUFqQytCTSw0UEFtQzlCWDs7Ozs7V0FDd0IsSUFBSUMsSUFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCB7IGNyZWF0ZUJveFNoYXBlIH0gZnJvbSAnLi4vLi4vaW5zdGFuY2UnO1xyXG5pbXBvcnQgeyBDb2xsaWRlcjNEIH0gZnJvbSAnLi9jb2xsaWRlci1jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJQm94U2hhcGUgfSBmcm9tICcuLi8uLi8uLi9zcGVjL2ktcGh5c2ljcy1zaGFwZSc7XHJcblxyXG5jb25zdCB7XHJcbiAgICBjY2NsYXNzLFxyXG4gICAgZXhlY3V0ZUluRWRpdE1vZGUsXHJcbiAgICBleGVjdXRpb25PcmRlcixcclxuICAgIG1lbnUsXHJcbiAgICBwcm9wZXJ0eSxcclxufSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5jb25zdCBWZWMzID0gY2MuVmVjMztcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFBoeXNpY3MgYm94IGNvbGxpZGVyXHJcbiAqICEjemhcclxuICog54mp55CG55uS5a2Q56Kw5pKe5ZmoXHJcbiAqIEBjbGFzcyBCb3hDb2xsaWRlcjNEXHJcbiAqIEBleHRlbmRzIENvbGxpZGVyM0RcclxuICovXHJcbkBjY2NsYXNzKCdjYy5Cb3hDb2xsaWRlcjNEJylcclxuQGV4ZWN1dGlvbk9yZGVyKDk4KVxyXG5AbWVudSgnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnBoeXNpY3MvQ29sbGlkZXIvQm94IDNEJylcclxuQGV4ZWN1dGVJbkVkaXRNb2RlXHJcbmV4cG9ydCBjbGFzcyBCb3hDb2xsaWRlcjNEIGV4dGVuZHMgQ29sbGlkZXIzRCB7XHJcblxyXG4gICAgLy8vIFBVQkxJQyBQUk9QRVJUWSBHRVRURVJcXFNFVFRFUiAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCBvciBzZXQgdGhlIHNpemUgb2YgdGhlIGJveCwgaW4gbG9jYWwgc3BhY2UuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5bmiJborr7nva7nm5LnmoTlpKflsI/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gc2l6ZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLlZlYzNcclxuICAgIH0pXHJcbiAgICBwdWJsaWMgZ2V0IHNpemUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2l6ZSAodmFsdWUpIHtcclxuICAgICAgICBWZWMzLmNvcHkodGhpcy5fc2l6ZSwgdmFsdWUpO1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm94U2hhcGUuc2l6ZSA9IHRoaXMuX3NpemU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtJQm94U2hhcGV9IGJveFNoYXBlXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBib3hTaGFwZSAoKTogSUJveFNoYXBlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcGUgYXMgSUJveFNoYXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLyBQUklWQVRFIFBST1BFUlRZIC8vL1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBfc2l6ZTogY2MuVmVjMyA9IG5ldyBWZWMzKDEsIDEsIDEpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlID0gY3JlYXRlQm94U2hhcGUodGhpcy5fc2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==