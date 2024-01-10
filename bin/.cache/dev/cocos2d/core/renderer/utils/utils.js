
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/utils/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var dynamicAtlasManager = require('./dynamic-atlas/manager');

var WHITE = cc.Color.WHITE; // share data of bmfont

var shareLabelInfo = {
  fontAtlas: null,
  fontSize: 0,
  lineHeight: 0,
  hAlign: 0,
  vAlign: 0,
  hash: "",
  fontFamily: "",
  fontDesc: "Arial",
  color: WHITE,
  isOutlined: false,
  out: WHITE,
  margin: 0
};
module.exports = {
  deleteFromDynamicAtlas: function deleteFromDynamicAtlas(comp, frame) {
    if (frame && !CC_TEST) {
      if (frame._original && dynamicAtlasManager) {
        dynamicAtlasManager.deleteAtlasSpriteFrame(frame);

        frame._resetDynamicAtlasFrame();
      }
    }
  },
  getFontFamily: function getFontFamily(comp) {
    if (!comp.useSystemFont) {
      if (comp.font) {
        if (comp.font._nativeAsset) {
          return comp.font._nativeAsset;
        }

        cc.assetManager.postLoadNative(comp.font, function (err) {
          comp.isValid && comp.setVertsDirty();
        });
        return 'Arial';
      }

      return 'Arial';
    } else {
      return comp.fontFamily || 'Arial';
    }
  },
  shareLabelInfo: shareLabelInfo
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx1dGlsc1xcdXRpbHMuanMiXSwibmFtZXMiOlsiZHluYW1pY0F0bGFzTWFuYWdlciIsInJlcXVpcmUiLCJXSElURSIsImNjIiwiQ29sb3IiLCJzaGFyZUxhYmVsSW5mbyIsImZvbnRBdGxhcyIsImZvbnRTaXplIiwibGluZUhlaWdodCIsImhBbGlnbiIsInZBbGlnbiIsImhhc2giLCJmb250RmFtaWx5IiwiZm9udERlc2MiLCJjb2xvciIsImlzT3V0bGluZWQiLCJvdXQiLCJtYXJnaW4iLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVsZXRlRnJvbUR5bmFtaWNBdGxhcyIsImNvbXAiLCJmcmFtZSIsIkNDX1RFU1QiLCJfb3JpZ2luYWwiLCJkZWxldGVBdGxhc1Nwcml0ZUZyYW1lIiwiX3Jlc2V0RHluYW1pY0F0bGFzRnJhbWUiLCJnZXRGb250RmFtaWx5IiwidXNlU3lzdGVtRm9udCIsImZvbnQiLCJfbmF0aXZlQXNzZXQiLCJhc3NldE1hbmFnZXIiLCJwb3N0TG9hZE5hdGl2ZSIsImVyciIsImlzVmFsaWQiLCJzZXRWZXJ0c0RpcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsbUJBQW1CLEdBQUdDLE9BQU8sQ0FBQyx5QkFBRCxDQUFuQzs7QUFDQSxJQUFNQyxLQUFLLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTRixLQUF2QixFQUVBOztBQUNBLElBQUlHLGNBQWMsR0FBRztBQUNqQkMsRUFBQUEsU0FBUyxFQUFFLElBRE07QUFHakJDLEVBQUFBLFFBQVEsRUFBQyxDQUhRO0FBSWpCQyxFQUFBQSxVQUFVLEVBQUMsQ0FKTTtBQUtqQkMsRUFBQUEsTUFBTSxFQUFDLENBTFU7QUFNakJDLEVBQUFBLE1BQU0sRUFBQyxDQU5VO0FBUWpCQyxFQUFBQSxJQUFJLEVBQUMsRUFSWTtBQVNqQkMsRUFBQUEsVUFBVSxFQUFDLEVBVE07QUFVakJDLEVBQUFBLFFBQVEsRUFBQyxPQVZRO0FBV2pCQyxFQUFBQSxLQUFLLEVBQUNaLEtBWFc7QUFZakJhLEVBQUFBLFVBQVUsRUFBQyxLQVpNO0FBYWpCQyxFQUFBQSxHQUFHLEVBQUNkLEtBYmE7QUFjakJlLEVBQUFBLE1BQU0sRUFBQztBQWRVLENBQXJCO0FBaUJBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFFYkMsRUFBQUEsc0JBRmEsa0NBRVdDLElBRlgsRUFFaUJDLEtBRmpCLEVBRXdCO0FBQ2pDLFFBQUlBLEtBQUssSUFBSSxDQUFDQyxPQUFkLEVBQXVCO0FBQ25CLFVBQUlELEtBQUssQ0FBQ0UsU0FBTixJQUFtQnhCLG1CQUF2QixFQUE0QztBQUN4Q0EsUUFBQUEsbUJBQW1CLENBQUN5QixzQkFBcEIsQ0FBMkNILEtBQTNDOztBQUNBQSxRQUFBQSxLQUFLLENBQUNJLHVCQUFOO0FBQ0g7QUFDSjtBQUNKLEdBVFk7QUFXYkMsRUFBQUEsYUFYYSx5QkFXRU4sSUFYRixFQVdRO0FBQ2pCLFFBQUksQ0FBQ0EsSUFBSSxDQUFDTyxhQUFWLEVBQXlCO0FBQ3JCLFVBQUlQLElBQUksQ0FBQ1EsSUFBVCxFQUFlO0FBQ1gsWUFBSVIsSUFBSSxDQUFDUSxJQUFMLENBQVVDLFlBQWQsRUFBNEI7QUFDeEIsaUJBQU9ULElBQUksQ0FBQ1EsSUFBTCxDQUFVQyxZQUFqQjtBQUNIOztBQUNEM0IsUUFBQUEsRUFBRSxDQUFDNEIsWUFBSCxDQUFnQkMsY0FBaEIsQ0FBK0JYLElBQUksQ0FBQ1EsSUFBcEMsRUFBMEMsVUFBVUksR0FBVixFQUFlO0FBQ3JEWixVQUFBQSxJQUFJLENBQUNhLE9BQUwsSUFBZ0JiLElBQUksQ0FBQ2MsYUFBTCxFQUFoQjtBQUNILFNBRkQ7QUFHQSxlQUFPLE9BQVA7QUFDSDs7QUFFRCxhQUFPLE9BQVA7QUFDSCxLQVpELE1BYUs7QUFDRCxhQUFPZCxJQUFJLENBQUNULFVBQUwsSUFBbUIsT0FBMUI7QUFDSDtBQUNKLEdBNUJZO0FBOEJiUCxFQUFBQSxjQUFjLEVBQUVBO0FBOUJILENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZHluYW1pY0F0bGFzTWFuYWdlciA9IHJlcXVpcmUoJy4vZHluYW1pYy1hdGxhcy9tYW5hZ2VyJyk7XHJcbmNvbnN0IFdISVRFID0gY2MuQ29sb3IuV0hJVEU7XHJcblxyXG4vLyBzaGFyZSBkYXRhIG9mIGJtZm9udFxyXG5sZXQgc2hhcmVMYWJlbEluZm8gPSB7XHJcbiAgICBmb250QXRsYXM6IG51bGwsXHJcbiAgICBcclxuICAgIGZvbnRTaXplOjAsXHJcbiAgICBsaW5lSGVpZ2h0OjAsXHJcbiAgICBoQWxpZ246MCxcclxuICAgIHZBbGlnbjowLFxyXG5cclxuICAgIGhhc2g6XCJcIixcclxuICAgIGZvbnRGYW1pbHk6XCJcIixcclxuICAgIGZvbnREZXNjOlwiQXJpYWxcIixcclxuICAgIGNvbG9yOldISVRFLFxyXG4gICAgaXNPdXRsaW5lZDpmYWxzZSxcclxuICAgIG91dDpXSElURSxcclxuICAgIG1hcmdpbjowLFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBkZWxldGVGcm9tRHluYW1pY0F0bGFzIChjb21wLCBmcmFtZSkge1xyXG4gICAgICAgIGlmIChmcmFtZSAmJiAhQ0NfVEVTVCkge1xyXG4gICAgICAgICAgICBpZiAoZnJhbWUuX29yaWdpbmFsICYmIGR5bmFtaWNBdGxhc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGR5bmFtaWNBdGxhc01hbmFnZXIuZGVsZXRlQXRsYXNTcHJpdGVGcmFtZShmcmFtZSk7XHJcbiAgICAgICAgICAgICAgICBmcmFtZS5fcmVzZXREeW5hbWljQXRsYXNGcmFtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRGb250RmFtaWx5IChjb21wKSB7XHJcbiAgICAgICAgaWYgKCFjb21wLnVzZVN5c3RlbUZvbnQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbXAuZm9udCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXAuZm9udC5fbmF0aXZlQXNzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcC5mb250Ll9uYXRpdmVBc3NldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZShjb21wLmZvbnQsIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wLmlzVmFsaWQgJiYgY29tcC5zZXRWZXJ0c0RpcnR5KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnQXJpYWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgcmV0dXJuICdBcmlhbCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcC5mb250RmFtaWx5IHx8ICdBcmlhbCc7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzaGFyZUxhYmVsSW5mbzogc2hhcmVMYWJlbEluZm9cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==