
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/index.js';
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
// PREDEFINE
// window may be undefined when first load engine from editor
var _global = typeof window === 'undefined' ? global : window;
/**
 * !#en
 * The main namespace of Cocos2d-JS, all engine core classes, functions, properties and constants are defined in this namespace.
 * !#zh
 * Cocos 引擎的主要命名空间，引擎代码中所有的类，函数，属性和常量都在这个命名空间中定义。
 * @module cc
 * @main cc
 */


_global.cc = _global.cc || {}; // For internal usage

cc.internal = cc.internal || {};

require('./predefine'); // polyfills


require('./polyfill/string');

require('./polyfill/misc');

require('./polyfill/array');

require('./polyfill/object');

require('./polyfill/array-buffer');

require('./polyfill/number');

if (!(CC_EDITOR && Editor.isMainProcess)) {
  require('./polyfill/typescript');
}

require('./cocos2d/core/predefine'); // LOAD COCOS2D ENGINE CODE


if (!(CC_EDITOR && Editor.isMainProcess)) {
  require('./cocos2d');
} // LOAD EXTENDS


require('./extends');

if (CC_EDITOR) {
  if (Editor.isMainProcess) {
    Editor.versions['cocos2d'] = require('./package').version;
  }
}

module.exports = _global.cc;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGluZGV4LmpzIl0sIm5hbWVzIjpbIl9nbG9iYWwiLCJ3aW5kb3ciLCJnbG9iYWwiLCJjYyIsImludGVybmFsIiwicmVxdWlyZSIsIkNDX0VESVRPUiIsIkVkaXRvciIsImlzTWFpblByb2Nlc3MiLCJ2ZXJzaW9ucyIsInZlcnNpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0EsSUFBSUEsT0FBTyxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUF2RDtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBRCxPQUFPLENBQUNHLEVBQVIsR0FBYUgsT0FBTyxDQUFDRyxFQUFSLElBQWMsRUFBM0IsRUFFQTs7QUFDQUEsRUFBRSxDQUFDQyxRQUFILEdBQWNELEVBQUUsQ0FBQ0MsUUFBSCxJQUFlLEVBQTdCOztBQUVBQyxPQUFPLENBQUMsYUFBRCxDQUFQLEVBRUE7OztBQUNBQSxPQUFPLENBQUMsbUJBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLGlCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxrQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsbUJBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLHlCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxtQkFBRCxDQUFQOztBQUNBLElBQUksRUFBRUMsU0FBUyxJQUFJQyxNQUFNLENBQUNDLGFBQXRCLENBQUosRUFBMEM7QUFDdENILEVBQUFBLE9BQU8sQ0FBQyx1QkFBRCxDQUFQO0FBQ0g7O0FBRURBLE9BQU8sQ0FBQywwQkFBRCxDQUFQLEVBRUE7OztBQUVBLElBQUksRUFBRUMsU0FBUyxJQUFJQyxNQUFNLENBQUNDLGFBQXRCLENBQUosRUFBMEM7QUFDdENILEVBQUFBLE9BQU8sQ0FBQyxXQUFELENBQVA7QUFDSCxFQUVEOzs7QUFFQUEsT0FBTyxDQUFDLFdBQUQsQ0FBUDs7QUFFQSxJQUFJQyxTQUFKLEVBQWU7QUFDWCxNQUFJQyxNQUFNLENBQUNDLGFBQVgsRUFBMEI7QUFDdEJELElBQUFBLE1BQU0sQ0FBQ0UsUUFBUCxDQUFnQixTQUFoQixJQUE2QkosT0FBTyxDQUFDLFdBQUQsQ0FBUCxDQUFxQkssT0FBbEQ7QUFDSDtBQUNKOztBQUVEQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJaLE9BQU8sQ0FBQ0csRUFBekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vLyBQUkVERUZJTkVcclxuXHJcbi8vIHdpbmRvdyBtYXkgYmUgdW5kZWZpbmVkIHdoZW4gZmlyc3QgbG9hZCBlbmdpbmUgZnJvbSBlZGl0b3JcclxudmFyIF9nbG9iYWwgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFRoZSBtYWluIG5hbWVzcGFjZSBvZiBDb2NvczJkLUpTLCBhbGwgZW5naW5lIGNvcmUgY2xhc3NlcywgZnVuY3Rpb25zLCBwcm9wZXJ0aWVzIGFuZCBjb25zdGFudHMgYXJlIGRlZmluZWQgaW4gdGhpcyBuYW1lc3BhY2UuXHJcbiAqICEjemhcclxuICogQ29jb3Mg5byV5pOO55qE5Li76KaB5ZG95ZCN56m66Ze077yM5byV5pOO5Luj56CB5Lit5omA5pyJ55qE57G777yM5Ye95pWw77yM5bGe5oCn5ZKM5bi46YeP6YO95Zyo6L+Z5Liq5ZG95ZCN56m66Ze05Lit5a6a5LmJ44CCXHJcbiAqIEBtb2R1bGUgY2NcclxuICogQG1haW4gY2NcclxuICovXHJcbl9nbG9iYWwuY2MgPSBfZ2xvYmFsLmNjIHx8IHt9O1xyXG5cclxuLy8gRm9yIGludGVybmFsIHVzYWdlXHJcbmNjLmludGVybmFsID0gY2MuaW50ZXJuYWwgfHwge307XHJcblxyXG5yZXF1aXJlKCcuL3ByZWRlZmluZScpO1xyXG5cclxuLy8gcG9seWZpbGxzXHJcbnJlcXVpcmUoJy4vcG9seWZpbGwvc3RyaW5nJyk7XHJcbnJlcXVpcmUoJy4vcG9seWZpbGwvbWlzYycpO1xyXG5yZXF1aXJlKCcuL3BvbHlmaWxsL2FycmF5Jyk7XHJcbnJlcXVpcmUoJy4vcG9seWZpbGwvb2JqZWN0Jyk7XHJcbnJlcXVpcmUoJy4vcG9seWZpbGwvYXJyYXktYnVmZmVyJyk7XHJcbnJlcXVpcmUoJy4vcG9seWZpbGwvbnVtYmVyJyk7XHJcbmlmICghKENDX0VESVRPUiAmJiBFZGl0b3IuaXNNYWluUHJvY2VzcykpIHtcclxuICAgIHJlcXVpcmUoJy4vcG9seWZpbGwvdHlwZXNjcmlwdCcpO1xyXG59XHJcblxyXG5yZXF1aXJlKCcuL2NvY29zMmQvY29yZS9wcmVkZWZpbmUnKTtcclxuXHJcbi8vIExPQUQgQ09DT1MyRCBFTkdJTkUgQ09ERVxyXG5cclxuaWYgKCEoQ0NfRURJVE9SICYmIEVkaXRvci5pc01haW5Qcm9jZXNzKSkge1xyXG4gICAgcmVxdWlyZSgnLi9jb2NvczJkJyk7XHJcbn1cclxuXHJcbi8vIExPQUQgRVhURU5EU1xyXG5cclxucmVxdWlyZSgnLi9leHRlbmRzJyk7XHJcblxyXG5pZiAoQ0NfRURJVE9SKSB7XHJcbiAgICBpZiAoRWRpdG9yLmlzTWFpblByb2Nlc3MpIHtcclxuICAgICAgICBFZGl0b3IudmVyc2lvbnNbJ2NvY29zMmQnXSA9IHJlcXVpcmUoJy4vcGFja2FnZScpLnZlcnNpb247XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gX2dsb2JhbC5jYzsiXSwic291cmNlUm9vdCI6Ii8ifQ==