
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

if (!CC_TEST && (!CC_EDITOR || !Editor.isMainProcess)) {
  require('./primitive');

  require('./physics/exports/physics-builtin');

  require('./physics/exports/physics-cannon');

  require('./physics/exports/physics-framework');
}

require('./CCModel');

require('./skeleton/CCSkeleton');

require('./skeleton/CCSkeletonAnimationClip');

require('./actions');

require('./physics/framework/assets/physics-material');

if (!CC_EDITOR || !Editor.isMainProcess) {
  require('./skeleton/CCSkeletonAnimation');

  require('./skeleton/CCSkinnedMeshRenderer');

  require('./skeleton/skinned-mesh-renderer');

  require('./CCLightComponent');

  require('./particle/particle-system-3d');

  require('./particle/renderer/particle-system-3d-renderer');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJDQ19URVNUIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiaXNNYWluUHJvY2VzcyIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJLENBQUNBLE9BQUQsS0FBYSxDQUFDQyxTQUFELElBQWMsQ0FBQ0MsTUFBTSxDQUFDQyxhQUFuQyxDQUFKLEVBQXVEO0FBQ25EQyxFQUFBQSxPQUFPLENBQUMsYUFBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMsbUNBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLGtDQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQyxxQ0FBRCxDQUFQO0FBQ0g7O0FBRURBLE9BQU8sQ0FBQyxXQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyx1QkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsb0NBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLFdBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLDZDQUFELENBQVA7O0FBRUEsSUFBSSxDQUFDSCxTQUFELElBQWMsQ0FBQ0MsTUFBTSxDQUFDQyxhQUExQixFQUF5QztBQUNyQ0MsRUFBQUEsT0FBTyxDQUFDLGdDQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQyxrQ0FBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMsa0NBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLG9CQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQywrQkFBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMsaURBQUQsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmlmICghQ0NfVEVTVCAmJiAoIUNDX0VESVRPUiB8fCAhRWRpdG9yLmlzTWFpblByb2Nlc3MpKSB7XHJcbiAgICByZXF1aXJlKCcuL3ByaW1pdGl2ZScpO1xyXG4gICAgcmVxdWlyZSgnLi9waHlzaWNzL2V4cG9ydHMvcGh5c2ljcy1idWlsdGluJyk7XHJcbiAgICByZXF1aXJlKCcuL3BoeXNpY3MvZXhwb3J0cy9waHlzaWNzLWNhbm5vbicpO1xyXG4gICAgcmVxdWlyZSgnLi9waHlzaWNzL2V4cG9ydHMvcGh5c2ljcy1mcmFtZXdvcmsnKTtcclxufVxyXG5cclxucmVxdWlyZSgnLi9DQ01vZGVsJyk7XHJcbnJlcXVpcmUoJy4vc2tlbGV0b24vQ0NTa2VsZXRvbicpO1xyXG5yZXF1aXJlKCcuL3NrZWxldG9uL0NDU2tlbGV0b25BbmltYXRpb25DbGlwJyk7XHJcbnJlcXVpcmUoJy4vYWN0aW9ucycpO1xyXG5yZXF1aXJlKCcuL3BoeXNpY3MvZnJhbWV3b3JrL2Fzc2V0cy9waHlzaWNzLW1hdGVyaWFsJyk7XHJcblxyXG5pZiAoIUNDX0VESVRPUiB8fCAhRWRpdG9yLmlzTWFpblByb2Nlc3MpIHtcclxuICAgIHJlcXVpcmUoJy4vc2tlbGV0b24vQ0NTa2VsZXRvbkFuaW1hdGlvbicpO1xyXG4gICAgcmVxdWlyZSgnLi9za2VsZXRvbi9DQ1NraW5uZWRNZXNoUmVuZGVyZXInKTtcclxuICAgIHJlcXVpcmUoJy4vc2tlbGV0b24vc2tpbm5lZC1tZXNoLXJlbmRlcmVyJyk7XHJcbiAgICByZXF1aXJlKCcuL0NDTGlnaHRDb21wb25lbnQnKTtcclxuICAgIHJlcXVpcmUoJy4vcGFydGljbGUvcGFydGljbGUtc3lzdGVtLTNkJyk7XHJcbiAgICByZXF1aXJlKCcuL3BhcnRpY2xlL3JlbmRlcmVyL3BhcnRpY2xlLXN5c3RlbS0zZC1yZW5kZXJlcicpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9