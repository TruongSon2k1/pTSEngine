
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTiledTile.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

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

/**
 * !#en TiledTile can control the specified map tile. 
 * It will apply the node rotation, scale, translate to the map tile.
 * You can change the TiledTile's gid to change the map tile's style.
 * !#zh TiledTile 可以单独对某一个地图块进行操作。
 * 他会将节点的旋转，缩放，平移操作应用在这个地图块上，并可以通过更换当前地图块的 gid 来更换地图块的显示样式。
 * @class TiledTile
 * @extends Component
 */
var TiledTile = cc.Class({
  name: 'cc.TiledTile',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    executeInEditMode: true,
    menu: 'i18n:MAIN_MENU.component.renderers/TiledTile'
  },
  ctor: function ctor() {
    this._layer = null;
  },
  properties: {
    _x: 0,
    _y: 0,

    /**
     * !#en Specify the TiledTile horizontal coordinate，use map tile as the unit.
     * !#zh 指定 TiledTile 的横向坐标，以地图块为单位
     * @property {Number} x
     * @default 0
     */
    x: {
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        if (value === this._x) return;

        if (this._layer && this._layer._isInvalidPosition(value, this._y)) {
          cc.warn("Invalid x, the valid value is between [%s] ~ [%s]", 0, this._layer._layerSize.width);
          return;
        }

        this._resetTile();

        this._x = value;

        this._updateInfo();
      },
      type: cc.Integer
    },

    /**
     * !#en Specify the TiledTile vertical coordinate，use map tile as the unit.
     * !#zh 指定 TiledTile 的纵向坐标，以地图块为单位
     * @property {Number} y
     * @default 0
     */
    y: {
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        if (value === this._y) return;

        if (this._layer && this._layer._isInvalidPosition(this._x, value)) {
          cc.warn("Invalid y, the valid value is between [%s] ~ [%s]", 0, this._layer._layerSize.height);
          return;
        }

        this._resetTile();

        this._y = value;

        this._updateInfo();
      },
      type: cc.Integer
    },

    /**
     * !#en Specify the TiledTile gid.
     * !#zh 指定 TiledTile 的 gid 值
     * @property {Number} gid
     * @default 0
     */
    gid: {
      get: function get() {
        if (this._layer) {
          return this._layer.getTileGIDAt(this._x, this._y);
        }

        return 0;
      },
      set: function set(value) {
        if (this._layer) {
          this._layer.setTileGIDAt(value, this._x, this._y);
        }
      },
      type: cc.Integer
    }
  },
  onEnable: function onEnable() {
    var parent = this.node.parent;
    this._layer = parent.getComponent(cc.TiledLayer);

    this._resetTile();

    this._updateInfo();
  },
  onDisable: function onDisable() {
    this._resetTile();
  },
  _resetTile: function _resetTile() {
    if (this._layer && this._layer.getTiledTileAt(this._x, this._y) === this) {
      this._layer.setTiledTileAt(this._x, this._y, null);
    }
  },
  _updateInfo: function _updateInfo() {
    if (!this._layer) return;
    var x = this._x,
        y = this._y;

    if (this._layer.getTiledTileAt(x, y)) {
      cc.warn('There is already a TiledTile at [%s, %s]', x, y);
      return;
    }

    this.node.setPosition(this._layer.getPositionAt(x, y));

    this._layer.setTiledTileAt(x, y, this);
  }
});
cc.TiledTile = module.exports = TiledTile;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHRpbGVtYXBcXENDVGlsZWRUaWxlLmpzIl0sIm5hbWVzIjpbIlRpbGVkVGlsZSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJtZW51IiwiY3RvciIsIl9sYXllciIsInByb3BlcnRpZXMiLCJfeCIsIl95IiwieCIsImdldCIsInNldCIsInZhbHVlIiwiX2lzSW52YWxpZFBvc2l0aW9uIiwid2FybiIsIl9sYXllclNpemUiLCJ3aWR0aCIsIl9yZXNldFRpbGUiLCJfdXBkYXRlSW5mbyIsInR5cGUiLCJJbnRlZ2VyIiwieSIsImhlaWdodCIsImdpZCIsImdldFRpbGVHSURBdCIsInNldFRpbGVHSURBdCIsIm9uRW5hYmxlIiwicGFyZW50Iiwibm9kZSIsImdldENvbXBvbmVudCIsIlRpbGVkTGF5ZXIiLCJvbkRpc2FibGUiLCJnZXRUaWxlZFRpbGVBdCIsInNldFRpbGVkVGlsZUF0Iiwic2V0UG9zaXRpb24iLCJnZXRQb3NpdGlvbkF0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLFNBQVMsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBRSxjQURlO0FBRXJCLGFBQVNGLEVBQUUsQ0FBQ0csU0FGUztBQUlyQkMsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLGlCQUFpQixFQUFFLElBREY7QUFFakJDLElBQUFB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LEVBQUFBLFVBaEdxQix3QkFnR1A7QUFDVixRQUFJLEtBQUtaLE1BQUwsSUFBZSxLQUFLQSxNQUFMLENBQVkyQixjQUFaLENBQTJCLEtBQUt6QixFQUFoQyxFQUFvQyxLQUFLQyxFQUF6QyxNQUFpRCxJQUFwRSxFQUEwRTtBQUN0RSxXQUFLSCxNQUFMLENBQVk0QixjQUFaLENBQTJCLEtBQUsxQixFQUFoQyxFQUFvQyxLQUFLQyxFQUF6QyxFQUE2QyxJQUE3QztBQUNIO0FBQ0osR0FwR29CO0FBc0dyQlUsRUFBQUEsV0F0R3FCLHlCQXNHTjtBQUNYLFFBQUksQ0FBQyxLQUFLYixNQUFWLEVBQWtCO0FBRWxCLFFBQUlJLENBQUMsR0FBRyxLQUFLRixFQUFiO0FBQUEsUUFBa0JjLENBQUMsR0FBRyxLQUFLYixFQUEzQjs7QUFDQSxRQUFJLEtBQUtILE1BQUwsQ0FBWTJCLGNBQVosQ0FBMkJ2QixDQUEzQixFQUE4QlksQ0FBOUIsQ0FBSixFQUFzQztBQUNsQ3pCLE1BQUFBLEVBQUUsQ0FBQ2tCLElBQUgsQ0FBUSwwQ0FBUixFQUFvREwsQ0FBcEQsRUFBdURZLENBQXZEO0FBQ0E7QUFDSDs7QUFDRCxTQUFLTyxJQUFMLENBQVVNLFdBQVYsQ0FBc0IsS0FBSzdCLE1BQUwsQ0FBWThCLGFBQVosQ0FBMEIxQixDQUExQixFQUE2QlksQ0FBN0IsQ0FBdEI7O0FBQ0EsU0FBS2hCLE1BQUwsQ0FBWTRCLGNBQVosQ0FBMkJ4QixDQUEzQixFQUE4QlksQ0FBOUIsRUFBaUMsSUFBakM7QUFDSDtBQWhIb0IsQ0FBVCxDQUFoQjtBQW1IQXpCLEVBQUUsQ0FBQ0QsU0FBSCxHQUFleUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCMUMsU0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRpbGVkVGlsZSBjYW4gY29udHJvbCB0aGUgc3BlY2lmaWVkIG1hcCB0aWxlLiBcclxuICogSXQgd2lsbCBhcHBseSB0aGUgbm9kZSByb3RhdGlvbiwgc2NhbGUsIHRyYW5zbGF0ZSB0byB0aGUgbWFwIHRpbGUuXHJcbiAqIFlvdSBjYW4gY2hhbmdlIHRoZSBUaWxlZFRpbGUncyBnaWQgdG8gY2hhbmdlIHRoZSBtYXAgdGlsZSdzIHN0eWxlLlxyXG4gKiAhI3poIFRpbGVkVGlsZSDlj6/ku6XljZXni6zlr7nmn5DkuIDkuKrlnLDlm77lnZfov5vooYzmk43kvZzjgIJcclxuICog5LuW5Lya5bCG6IqC54K555qE5peL6L2s77yM57yp5pS+77yM5bmz56e75pON5L2c5bqU55So5Zyo6L+Z5Liq5Zyw5Zu+5Z2X5LiK77yM5bm25Y+v5Lul6YCa6L+H5pu05o2i5b2T5YmN5Zyw5Zu+5Z2X55qEIGdpZCDmnaXmm7TmjaLlnLDlm77lnZfnmoTmmL7npLrmoLflvI/jgIJcclxuICogQGNsYXNzIFRpbGVkVGlsZVxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbmxldCBUaWxlZFRpbGUgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuVGlsZWRUaWxlJyxcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWUsXHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5yZW5kZXJlcnMvVGlsZWRUaWxlJyxcclxuICAgIH0sXHJcblxyXG4gICAgY3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXIgPSBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX3g6IDAsXHJcbiAgICAgICAgX3k6IDAsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gU3BlY2lmeSB0aGUgVGlsZWRUaWxlIGhvcml6b250YWwgY29vcmRpbmF0Ze+8jHVzZSBtYXAgdGlsZSBhcyB0aGUgdW5pdC5cclxuICAgICAgICAgKiAhI3poIOaMh+WumiBUaWxlZFRpbGUg55qE5qiq5ZCR5Z2Q5qCH77yM5Lul5Zyw5Zu+5Z2X5Li65Y2V5L2NXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHhcclxuICAgICAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgeDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5feCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xheWVyICYmIHRoaXMuX2xheWVyLl9pc0ludmFsaWRQb3NpdGlvbih2YWx1ZSwgdGhpcy5feSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy53YXJuKGBJbnZhbGlkIHgsIHRoZSB2YWxpZCB2YWx1ZSBpcyBiZXR3ZWVuIFslc10gfiBbJXNdYCwgMCwgdGhpcy5fbGF5ZXIuX2xheWVyU2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRUaWxlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVJbmZvKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFNwZWNpZnkgdGhlIFRpbGVkVGlsZSB2ZXJ0aWNhbCBjb29yZGluYXRl77yMdXNlIG1hcCB0aWxlIGFzIHRoZSB1bml0LlxyXG4gICAgICAgICAqICEjemgg5oyH5a6aIFRpbGVkVGlsZSDnmoTnurXlkJHlnZDmoIfvvIzku6XlnLDlm77lnZfkuLrljZXkvY1cclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0geVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICB5OiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLl95KSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGF5ZXIgJiYgdGhpcy5fbGF5ZXIuX2lzSW52YWxpZFBvc2l0aW9uKHRoaXMuX3gsIHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oYEludmFsaWQgeSwgdGhlIHZhbGlkIHZhbHVlIGlzIGJldHdlZW4gWyVzXSB+IFslc11gLCAwLCB0aGlzLl9sYXllci5fbGF5ZXJTaXplLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRUaWxlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVJbmZvKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFNwZWNpZnkgdGhlIFRpbGVkVGlsZSBnaWQuXHJcbiAgICAgICAgICogISN6aCDmjIflrpogVGlsZWRUaWxlIOeahCBnaWQg5YC8XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGdpZFxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICBnaWQ6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sYXllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXllci5nZXRUaWxlR0lEQXQodGhpcy5feCwgdGhpcy5feSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXIuc2V0VGlsZUdJREF0KHZhbHVlLCB0aGlzLl94LCB0aGlzLl95KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlclxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIHRoaXMuX2xheWVyID0gcGFyZW50LmdldENvbXBvbmVudChjYy5UaWxlZExheWVyKTtcclxuICAgICAgICB0aGlzLl9yZXNldFRpbGUoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVJbmZvKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGlzYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRUaWxlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZXNldFRpbGUgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXllciAmJiB0aGlzLl9sYXllci5nZXRUaWxlZFRpbGVBdCh0aGlzLl94LCB0aGlzLl95KSA9PT0gdGhpcykge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllci5zZXRUaWxlZFRpbGVBdCh0aGlzLl94LCB0aGlzLl95LCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVJbmZvICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xheWVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB4ID0gdGhpcy5feCwgIHkgPSB0aGlzLl95O1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXllci5nZXRUaWxlZFRpbGVBdCh4LCB5KSkge1xyXG4gICAgICAgICAgICBjYy53YXJuKCdUaGVyZSBpcyBhbHJlYWR5IGEgVGlsZWRUaWxlIGF0IFslcywgJXNdJywgeCwgeSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuX2xheWVyLmdldFBvc2l0aW9uQXQoeCwgeSkpO1xyXG4gICAgICAgIHRoaXMuX2xheWVyLnNldFRpbGVkVGlsZUF0KHgsIHksIHRoaXMpO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG5jYy5UaWxlZFRpbGUgPSBtb2R1bGUuZXhwb3J0cyA9IFRpbGVkVGlsZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=