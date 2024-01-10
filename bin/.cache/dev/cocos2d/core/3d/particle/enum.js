
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/enum.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.TextureMode = exports.TrailMode = exports.ArcMode = exports.EmitLocation = exports.ShapeType = exports.RenderMode = exports.Space = void 0;

var _CCEnum = _interopRequireDefault(require("../../platform/CCEnum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @enum ParticleSystem3DAssembler.Space
 */
var Space = (0, _CCEnum["default"])({
  World: 0,
  Local: 1,
  Custom: 2
});
/**
 * 粒子的生成模式
 * @enum ParticleSystem3DAssembler.RenderMode
 */

exports.Space = Space;
var RenderMode = (0, _CCEnum["default"])({
  /**
   * 粒子始终面向摄像机
   */
  Billboard: 0,

  /**
   * 粒子始终面向摄像机但会根据参数进行拉伸
   */
  StrecthedBillboard: 1,

  /**
   * 粒子始终与 XZ 平面平行
   */
  HorizontalBillboard: 2,

  /**
   * 粒子始终与 Y 轴平行且朝向摄像机
   */
  VerticalBillboard: 3,

  /**
   * 粒子保持模型本身状态
   */
  Mesh: 4
});
/**
 * 粒子发射器类型
 * @enum shapeModule.ShapeType
 */

exports.RenderMode = RenderMode;
var ShapeType = (0, _CCEnum["default"])({
  /**
   * 立方体类型粒子发射器
   * @property {Number} Box
   */
  Box: 0,

  /**
   * 圆形粒子发射器
   * @property {Number} Circle
   */
  Circle: 1,

  /**
   * 圆锥体粒子发射器
   * @property {Number} Cone
   */
  Cone: 2,

  /**
   * 球体粒子发射器
   * @property {Number} Sphere
   */
  Sphere: 3,

  /**
   * 半球体粒子发射器
   * @property {Number} Hemisphere
   */
  Hemisphere: 4
});
/**
 * 粒子从发射器的哪个部位发射
 * @enum shapeModule.EmitLocation
 */

exports.ShapeType = ShapeType;
var EmitLocation = (0, _CCEnum["default"])({
  /**
   * 基础位置发射（仅对 Circle 类型及 Cone 类型的粒子发射器适用）
   * @property {Number} Base
   */
  Base: 0,

  /**
   * 边框位置发射（仅对 Box 类型及 Circle 类型的粒子发射器适用）
   * @property {Number} Edge
   */
  Edge: 1,

  /**
   * 表面位置发射（对所有类型的粒子发射器都适用）
   * @property {Number} Shell
   */
  Shell: 2,

  /**
   * 内部位置发射（对所有类型的粒子发射器都适用）
   * @property {Number} Volume
   */
  Volume: 3
});
/**
 * 粒子在扇形区域的发射方式
 * @enum shapeModule.ArcMode
 */

exports.EmitLocation = EmitLocation;
var ArcMode = (0, _CCEnum["default"])({
  /**
   * 随机位置发射
   * @property {Number} Random
   */
  Random: 0,

  /**
   * 沿某一方向循环发射，每次循环方向相同
   * @property {Number} Loop
   */
  Loop: 1,

  /**
   * 循环发射，每次循环方向相反
   * @property {Number} PingPong
   */
  PingPong: 2
});
/**
 * 选择如何为粒子系统生成轨迹
 * @enum trailModule.TrailMode
 */

exports.ArcMode = ArcMode;
var TrailMode = (0, _CCEnum["default"])({
  /**
   * 粒子模式<bg>
   * 创建一种效果，其中每个粒子在其路径中留下固定的轨迹
   */
  Particles: 0,

  /**
   * 带模式<bg>
   * 根据其生命周期创建连接每个粒子的轨迹带
   */
  Ribbon: 1
});
/**
 * 纹理填充模式
 * @enum trailModule.TextureMode
 */

exports.TrailMode = TrailMode;
var TextureMode = (0, _CCEnum["default"])({
  /**
   * 拉伸填充纹理
   */
  Stretch: 0,

  /**
   * 重复填充纹理
   */
  Repeat: 1
});
exports.TextureMode = TextureMode;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcZW51bS50cyJdLCJuYW1lcyI6WyJTcGFjZSIsIldvcmxkIiwiTG9jYWwiLCJDdXN0b20iLCJSZW5kZXJNb2RlIiwiQmlsbGJvYXJkIiwiU3RyZWN0aGVkQmlsbGJvYXJkIiwiSG9yaXpvbnRhbEJpbGxib2FyZCIsIlZlcnRpY2FsQmlsbGJvYXJkIiwiTWVzaCIsIlNoYXBlVHlwZSIsIkJveCIsIkNpcmNsZSIsIkNvbmUiLCJTcGhlcmUiLCJIZW1pc3BoZXJlIiwiRW1pdExvY2F0aW9uIiwiQmFzZSIsIkVkZ2UiLCJTaGVsbCIsIlZvbHVtZSIsIkFyY01vZGUiLCJSYW5kb20iLCJMb29wIiwiUGluZ1BvbmciLCJUcmFpbE1vZGUiLCJQYXJ0aWNsZXMiLCJSaWJib24iLCJUZXh0dXJlTW9kZSIsIlN0cmV0Y2giLCJSZXBlYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBO0FBQ0E7QUFDQTtBQUNPLElBQU1BLEtBQUssR0FBRyx3QkFBSztBQUN0QkMsRUFBQUEsS0FBSyxFQUFFLENBRGU7QUFFdEJDLEVBQUFBLEtBQUssRUFBRSxDQUZlO0FBR3RCQyxFQUFBQSxNQUFNLEVBQUU7QUFIYyxDQUFMLENBQWQ7QUFNUDtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sSUFBTUMsVUFBVSxHQUFHLHdCQUFLO0FBRTNCO0FBQ0o7QUFDQTtBQUNJQyxFQUFBQSxTQUFTLEVBQUUsQ0FMZ0I7O0FBTzNCO0FBQ0o7QUFDQTtBQUNJQyxFQUFBQSxrQkFBa0IsRUFBRSxDQVZPOztBQVkzQjtBQUNKO0FBQ0E7QUFDSUMsRUFBQUEsbUJBQW1CLEVBQUUsQ0FmTTs7QUFpQjNCO0FBQ0o7QUFDQTtBQUNJQyxFQUFBQSxpQkFBaUIsRUFBRSxDQXBCUTs7QUFzQjNCO0FBQ0o7QUFDQTtBQUNJQyxFQUFBQSxJQUFJLEVBQUU7QUF6QnFCLENBQUwsQ0FBbkI7QUE0QlA7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLElBQU1DLFNBQVMsR0FBRyx3QkFBSztBQUMxQjtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxHQUFHLEVBQUUsQ0FMcUI7O0FBTzFCO0FBQ0o7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLE1BQU0sRUFBRSxDQVhrQjs7QUFhMUI7QUFDSjtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsSUFBSSxFQUFFLENBakJvQjs7QUFtQjFCO0FBQ0o7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLE1BQU0sRUFBRSxDQXZCa0I7O0FBeUIxQjtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxVQUFVLEVBQUU7QUE3QmMsQ0FBTCxDQUFsQjtBQWdDUDtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sSUFBTUMsWUFBWSxHQUFHLHdCQUFLO0FBQzdCO0FBQ0o7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLElBQUksRUFBRSxDQUx1Qjs7QUFPN0I7QUFDSjtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsSUFBSSxFQUFFLENBWHVCOztBQWE3QjtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxLQUFLLEVBQUUsQ0FqQnNCOztBQW1CN0I7QUFDSjtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsTUFBTSxFQUFFO0FBdkJxQixDQUFMLENBQXJCO0FBMEJQO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxJQUFNQyxPQUFPLEdBQUcsd0JBQUs7QUFDeEI7QUFDSjtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsTUFBTSxFQUFFLENBTGdCOztBQU94QjtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxJQUFJLEVBQUUsQ0FYa0I7O0FBYXhCO0FBQ0o7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFFBQVEsRUFBRTtBQWpCYyxDQUFMLENBQWhCO0FBb0JQO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxJQUFNQyxTQUFTLEdBQUcsd0JBQUs7QUFDMUI7QUFDSjtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsU0FBUyxFQUFFLENBTGU7O0FBTzFCO0FBQ0o7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLE1BQU0sRUFBRTtBQVhrQixDQUFMLENBQWxCO0FBY1A7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLElBQU1DLFdBQVcsR0FBRyx3QkFBSztBQUM1QjtBQUNKO0FBQ0E7QUFDSUMsRUFBQUEsT0FBTyxFQUFFLENBSm1COztBQU01QjtBQUNKO0FBQ0E7QUFDSUMsRUFBQUEsTUFBTSxFQUFFO0FBVG9CLENBQUwsQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW51bSAgZnJvbSAnLi4vLi4vcGxhdGZvcm0vQ0NFbnVtJztcclxuXHJcbi8qKlxyXG4gKiBAZW51bSBQYXJ0aWNsZVN5c3RlbTNEQXNzZW1ibGVyLlNwYWNlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgU3BhY2UgPSBFbnVtKHtcclxuICAgIFdvcmxkOiAwLFxyXG4gICAgTG9jYWw6IDEsXHJcbiAgICBDdXN0b206IDIsXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIOeykuWtkOeahOeUn+aIkOaooeW8j1xyXG4gKiBAZW51bSBQYXJ0aWNsZVN5c3RlbTNEQXNzZW1ibGVyLlJlbmRlck1vZGVcclxuICovXHJcbmV4cG9ydCBjb25zdCBSZW5kZXJNb2RlID0gRW51bSh7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnspLlrZDlp4vnu4jpnaLlkJHmkYTlg4/mnLpcclxuICAgICAqL1xyXG4gICAgQmlsbGJvYXJkOiAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57KS5a2Q5aeL57uI6Z2i5ZCR5pGE5YOP5py65L2G5Lya5qC55o2u5Y+C5pWw6L+b6KGM5ouJ5Ly4XHJcbiAgICAgKi9cclxuICAgIFN0cmVjdGhlZEJpbGxib2FyZDogMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeykuWtkOWni+e7iOS4jiBYWiDlubPpnaLlubPooYxcclxuICAgICAqL1xyXG4gICAgSG9yaXpvbnRhbEJpbGxib2FyZDogMixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeykuWtkOWni+e7iOS4jiBZIOi9tOW5s+ihjOS4lOacneWQkeaRhOWDj+aculxyXG4gICAgICovXHJcbiAgICBWZXJ0aWNhbEJpbGxib2FyZDogMyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeykuWtkOS/neaMgeaooeWei+acrOi6q+eKtuaAgVxyXG4gICAgICovXHJcbiAgICBNZXNoOiA0LFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiDnspLlrZDlj5HlsITlmajnsbvlnotcclxuICogQGVudW0gc2hhcGVNb2R1bGUuU2hhcGVUeXBlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgU2hhcGVUeXBlID0gRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqIOeri+aWueS9k+exu+Wei+eykuWtkOWPkeWwhOWZqFxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJveFxyXG4gICAgICovXHJcbiAgICBCb3g6IDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnIblvaLnspLlrZDlj5HlsITlmahcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDaXJjbGVcclxuICAgICAqL1xyXG4gICAgQ2lyY2xlOiAxLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZyG6ZSl5L2T57KS5a2Q5Y+R5bCE5ZmoXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQ29uZVxyXG4gICAgICovXHJcbiAgICBDb25lOiAyLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55CD5L2T57KS5a2Q5Y+R5bCE5ZmoXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU3BoZXJlXHJcbiAgICAgKi9cclxuICAgIFNwaGVyZTogMyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWNiueQg+S9k+eykuWtkOWPkeWwhOWZqFxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEhlbWlzcGhlcmVcclxuICAgICAqL1xyXG4gICAgSGVtaXNwaGVyZTogNCxcclxufSk7XHJcblxyXG4vKipcclxuICog57KS5a2Q5LuO5Y+R5bCE5Zmo55qE5ZOq5Liq6YOo5L2N5Y+R5bCEXHJcbiAqIEBlbnVtIHNoYXBlTW9kdWxlLkVtaXRMb2NhdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEVtaXRMb2NhdGlvbiA9IEVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiDln7rnoYDkvY3nva7lj5HlsITvvIjku4Xlr7kgQ2lyY2xlIOexu+Wei+WPiiBDb25lIOexu+Wei+eahOeykuWtkOWPkeWwhOWZqOmAgueUqO+8iVxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJhc2VcclxuICAgICAqL1xyXG4gICAgQmFzZTogMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi+ueahhuS9jee9ruWPkeWwhO+8iOS7heWvuSBCb3gg57G75Z6L5Y+KIENpcmNsZSDnsbvlnovnmoTnspLlrZDlj5HlsITlmajpgILnlKjvvIlcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBFZGdlXHJcbiAgICAgKi9cclxuICAgIEVkZ2U6IDEsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDooajpnaLkvY3nva7lj5HlsITvvIjlr7nmiYDmnInnsbvlnovnmoTnspLlrZDlj5HlsITlmajpg73pgILnlKjvvIlcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTaGVsbFxyXG4gICAgICovXHJcbiAgICBTaGVsbDogMixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWGhemDqOS9jee9ruWPkeWwhO+8iOWvueaJgOacieexu+Wei+eahOeykuWtkOWPkeWwhOWZqOmDvemAgueUqO+8iVxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFZvbHVtZVxyXG4gICAgICovXHJcbiAgICBWb2x1bWU6IDMsXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIOeykuWtkOWcqOaJh+W9ouWMuuWfn+eahOWPkeWwhOaWueW8j1xyXG4gKiBAZW51bSBzaGFwZU1vZHVsZS5BcmNNb2RlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgQXJjTW9kZSA9IEVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiDpmo/mnLrkvY3nva7lj5HlsIRcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSYW5kb21cclxuICAgICAqL1xyXG4gICAgUmFuZG9tOiAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rK/5p+Q5LiA5pa55ZCR5b6q546v5Y+R5bCE77yM5q+P5qyh5b6q546v5pa55ZCR55u45ZCMXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTG9vcFxyXG4gICAgICovXHJcbiAgICBMb29wOiAxLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b6q546v5Y+R5bCE77yM5q+P5qyh5b6q546v5pa55ZCR55u45Y+NXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUGluZ1BvbmdcclxuICAgICAqL1xyXG4gICAgUGluZ1Bvbmc6IDIsXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIOmAieaLqeWmguS9leS4uueykuWtkOezu+e7n+eUn+aIkOi9qOi/uVxyXG4gKiBAZW51bSB0cmFpbE1vZHVsZS5UcmFpbE1vZGVcclxuICovXHJcbmV4cG9ydCBjb25zdCBUcmFpbE1vZGUgPSBFbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICog57KS5a2Q5qih5byPPGJnPlxyXG4gICAgICog5Yib5bu65LiA56eN5pWI5p6c77yM5YW25Lit5q+P5Liq57KS5a2Q5Zyo5YW26Lev5b6E5Lit55WZ5LiL5Zu65a6a55qE6L2o6L+5XHJcbiAgICAgKi9cclxuICAgIFBhcnRpY2xlczogMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW4puaooeW8jzxiZz5cclxuICAgICAqIOagueaNruWFtueUn+WRveWRqOacn+WIm+W7uui/nuaOpeavj+S4queykuWtkOeahOi9qOi/ueW4plxyXG4gICAgICovXHJcbiAgICBSaWJib246IDEsXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIOe6ueeQhuWhq+WFheaooeW8j1xyXG4gKiBAZW51bSB0cmFpbE1vZHVsZS5UZXh0dXJlTW9kZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRleHR1cmVNb2RlID0gRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqIOaLieS8uOWhq+WFhee6ueeQhlxyXG4gICAgICovXHJcbiAgICBTdHJldGNoOiAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN5aSN5aGr5YWF57q555CGXHJcbiAgICAgKi9cclxuICAgIFJlcGVhdDogMSxcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9