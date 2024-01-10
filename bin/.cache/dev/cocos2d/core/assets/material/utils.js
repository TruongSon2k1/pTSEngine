
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _enums = _interopRequireDefault(require("../../../renderer/enums"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.  
// function genHashCode (str) {
//     var hash = 0;
//     if (str.length == 0) {
//         return hash;
//     }
//     for (var i = 0; i < str.length; i++) {
//         var char = str.charCodeAt(i);
//         hash = ((hash<<5)-hash)+char;
//         hash = hash & hash; // Convert to 32bit integer
//     }
//     return hash;
// }
function serializeDefines(defines) {
  var str = '';

  for (var name in defines) {
    str += name + defines[name];
  }

  return str;
}

function serializePass(pass, excludeProperties) {
  var str = pass._programName + pass._cullMode;

  if (pass._blend) {
    str += pass._blendEq + pass._blendAlphaEq + pass._blendSrc + pass._blendDst + pass._blendSrcAlpha + pass._blendDstAlpha + pass._blendColor;
  }

  if (pass._depthTest) {
    str += pass._depthWrite + pass._depthFunc;
  }

  if (pass._stencilTest) {
    str += pass._stencilFuncFront + pass._stencilRefFront + pass._stencilMaskFront + pass._stencilFailOpFront + pass._stencilZFailOpFront + pass._stencilZPassOpFront + pass._stencilWriteMaskFront + pass._stencilFuncBack + pass._stencilRefBack + pass._stencilMaskBack + pass._stencilFailOpBack + pass._stencilZFailOpBack + pass._stencilZPassOpBack + pass._stencilWriteMaskBack;
  }

  if (!excludeProperties) {
    str += serializeUniforms(pass._properties);
  }

  str += serializeDefines(pass._defines);
  return str;
}

function serializePasses(passes) {
  var hashData = '';

  for (var i = 0; i < passes.length; i++) {
    hashData += serializePass(passes[i]);
  }

  return hashData;
}

function serializeUniforms(uniforms) {
  var hashData = '';

  for (var name in uniforms) {
    var param = uniforms[name];
    var prop = param.value;

    if (!prop) {
      continue;
    }

    if (param.type === _enums["default"].PARAM_TEXTURE_2D || param.type === _enums["default"].PARAM_TEXTURE_CUBE) {
      hashData += prop._id + ';';
    } else {
      hashData += prop.toString() + ';';
    }
  }

  return hashData;
}

var _default = {
  serializeDefines: serializeDefines,
  serializePasses: serializePasses,
  serializeUniforms: serializeUniforms
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcbWF0ZXJpYWxcXHV0aWxzLmpzIl0sIm5hbWVzIjpbInNlcmlhbGl6ZURlZmluZXMiLCJkZWZpbmVzIiwic3RyIiwibmFtZSIsInNlcmlhbGl6ZVBhc3MiLCJwYXNzIiwiZXhjbHVkZVByb3BlcnRpZXMiLCJfcHJvZ3JhbU5hbWUiLCJfY3VsbE1vZGUiLCJfYmxlbmQiLCJfYmxlbmRFcSIsIl9ibGVuZEFscGhhRXEiLCJfYmxlbmRTcmMiLCJfYmxlbmREc3QiLCJfYmxlbmRTcmNBbHBoYSIsIl9ibGVuZERzdEFscGhhIiwiX2JsZW5kQ29sb3IiLCJfZGVwdGhUZXN0IiwiX2RlcHRoV3JpdGUiLCJfZGVwdGhGdW5jIiwiX3N0ZW5jaWxUZXN0IiwiX3N0ZW5jaWxGdW5jRnJvbnQiLCJfc3RlbmNpbFJlZkZyb250IiwiX3N0ZW5jaWxNYXNrRnJvbnQiLCJfc3RlbmNpbEZhaWxPcEZyb250IiwiX3N0ZW5jaWxaRmFpbE9wRnJvbnQiLCJfc3RlbmNpbFpQYXNzT3BGcm9udCIsIl9zdGVuY2lsV3JpdGVNYXNrRnJvbnQiLCJfc3RlbmNpbEZ1bmNCYWNrIiwiX3N0ZW5jaWxSZWZCYWNrIiwiX3N0ZW5jaWxNYXNrQmFjayIsIl9zdGVuY2lsRmFpbE9wQmFjayIsIl9zdGVuY2lsWkZhaWxPcEJhY2siLCJfc3RlbmNpbFpQYXNzT3BCYWNrIiwiX3N0ZW5jaWxXcml0ZU1hc2tCYWNrIiwic2VyaWFsaXplVW5pZm9ybXMiLCJfcHJvcGVydGllcyIsIl9kZWZpbmVzIiwic2VyaWFsaXplUGFzc2VzIiwicGFzc2VzIiwiaGFzaERhdGEiLCJpIiwibGVuZ3RoIiwidW5pZm9ybXMiLCJwYXJhbSIsInByb3AiLCJ2YWx1ZSIsInR5cGUiLCJlbnVtcyIsIlBBUkFNX1RFWFRVUkVfMkQiLCJQQVJBTV9URVhUVVJFX0NVQkUiLCJfaWQiLCJ0b1N0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7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QyxrQkFBTUMsZ0JBQXJCLElBQXlDTCxLQUFLLENBQUNHLElBQU4sS0FBZUMsa0JBQU1FLGtCQUFsRSxFQUFzRjtBQUNsRlYsTUFBQUEsUUFBUSxJQUFJSyxJQUFJLENBQUNNLEdBQUwsR0FBVyxHQUF2QjtBQUNILEtBRkQsTUFHSztBQUNEWCxNQUFBQSxRQUFRLElBQUlLLElBQUksQ0FBQ08sUUFBTCxLQUFrQixHQUE5QjtBQUNIO0FBQ0o7O0FBRUQsU0FBT1osUUFBUDtBQUNIOztlQUVjO0FBQ1h4QyxFQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQURXO0FBRVhzQyxFQUFBQSxlQUFlLEVBQWZBLGVBRlc7QUFHWEgsRUFBQUEsaUJBQWlCLEVBQWpCQTtBQUhXIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuICBcclxuXHJcbmltcG9ydCBlbnVtcyBmcm9tICcuLi8uLi8uLi9yZW5kZXJlci9lbnVtcyc7XHJcblxyXG4vLyBmdW5jdGlvbiBnZW5IYXNoQ29kZSAoc3RyKSB7XHJcbi8vICAgICB2YXIgaGFzaCA9IDA7XHJcbi8vICAgICBpZiAoc3RyLmxlbmd0aCA9PSAwKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGhhc2g7XHJcbi8vICAgICB9XHJcbi8vICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xyXG4vLyAgICAgICAgIHZhciBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbi8vICAgICAgICAgaGFzaCA9ICgoaGFzaDw8NSktaGFzaCkrY2hhcjtcclxuLy8gICAgICAgICBoYXNoID0gaGFzaCAmIGhhc2g7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxyXG4vLyAgICAgfVxyXG4vLyAgICAgcmV0dXJuIGhhc2g7XHJcbi8vIH1cclxuXHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZURlZmluZXMgKGRlZmluZXMpIHtcclxuICAgIGxldCBzdHIgPSAnJztcclxuICAgIGZvciAobGV0IG5hbWUgaW4gZGVmaW5lcykge1xyXG4gICAgICAgIHN0ciArPSBuYW1lICsgZGVmaW5lc1tuYW1lXTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZVBhc3MgKHBhc3MsIGV4Y2x1ZGVQcm9wZXJ0aWVzKSB7XHJcbiAgICBsZXQgc3RyID0gcGFzcy5fcHJvZ3JhbU5hbWUgKyBwYXNzLl9jdWxsTW9kZTtcclxuICAgIGlmIChwYXNzLl9ibGVuZCkge1xyXG4gICAgICAgIHN0ciArPSBwYXNzLl9ibGVuZEVxICsgcGFzcy5fYmxlbmRBbHBoYUVxICsgcGFzcy5fYmxlbmRTcmMgKyBwYXNzLl9ibGVuZERzdFxyXG4gICAgICAgICAgICArIHBhc3MuX2JsZW5kU3JjQWxwaGEgKyBwYXNzLl9ibGVuZERzdEFscGhhICsgcGFzcy5fYmxlbmRDb2xvcjtcclxuICAgIH1cclxuICAgIGlmIChwYXNzLl9kZXB0aFRlc3QpIHtcclxuICAgICAgICBzdHIgKz0gcGFzcy5fZGVwdGhXcml0ZSArIHBhc3MuX2RlcHRoRnVuYztcclxuICAgIH1cclxuICAgIGlmIChwYXNzLl9zdGVuY2lsVGVzdCkge1xyXG4gICAgICAgIHN0ciArPSBwYXNzLl9zdGVuY2lsRnVuY0Zyb250ICsgcGFzcy5fc3RlbmNpbFJlZkZyb250ICsgcGFzcy5fc3RlbmNpbE1hc2tGcm9udFxyXG4gICAgICAgICAgICArIHBhc3MuX3N0ZW5jaWxGYWlsT3BGcm9udCArIHBhc3MuX3N0ZW5jaWxaRmFpbE9wRnJvbnQgKyBwYXNzLl9zdGVuY2lsWlBhc3NPcEZyb250XHJcbiAgICAgICAgICAgICsgcGFzcy5fc3RlbmNpbFdyaXRlTWFza0Zyb250XHJcbiAgICAgICAgICAgICsgcGFzcy5fc3RlbmNpbEZ1bmNCYWNrICsgcGFzcy5fc3RlbmNpbFJlZkJhY2sgKyBwYXNzLl9zdGVuY2lsTWFza0JhY2tcclxuICAgICAgICAgICAgKyBwYXNzLl9zdGVuY2lsRmFpbE9wQmFjayArIHBhc3MuX3N0ZW5jaWxaRmFpbE9wQmFjayArIHBhc3MuX3N0ZW5jaWxaUGFzc09wQmFja1xyXG4gICAgICAgICAgICArIHBhc3MuX3N0ZW5jaWxXcml0ZU1hc2tCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghZXhjbHVkZVByb3BlcnRpZXMpIHtcclxuICAgICAgICBzdHIgKz0gc2VyaWFsaXplVW5pZm9ybXMocGFzcy5fcHJvcGVydGllcyk7XHJcbiAgICB9XHJcbiAgICBzdHIgKz0gc2VyaWFsaXplRGVmaW5lcyhwYXNzLl9kZWZpbmVzKTtcclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXJpYWxpemVQYXNzZXMgKHBhc3Nlcykge1xyXG4gICAgbGV0IGhhc2hEYXRhID0gJyc7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhc3Nlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGhhc2hEYXRhICs9IHNlcmlhbGl6ZVBhc3MocGFzc2VzW2ldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBoYXNoRGF0YTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VyaWFsaXplVW5pZm9ybXMgKHVuaWZvcm1zKSB7XHJcbiAgICBsZXQgaGFzaERhdGEgPSAnJztcclxuICAgIGZvciAobGV0IG5hbWUgaW4gdW5pZm9ybXMpIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB1bmlmb3Jtc1tuYW1lXTtcclxuICAgICAgICBsZXQgcHJvcCA9IHBhcmFtLnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoIXByb3ApIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyYW0udHlwZSA9PT0gZW51bXMuUEFSQU1fVEVYVFVSRV8yRCB8fCBwYXJhbS50eXBlID09PSBlbnVtcy5QQVJBTV9URVhUVVJFX0NVQkUpIHtcclxuICAgICAgICAgICAgaGFzaERhdGEgKz0gcHJvcC5faWQgKyAnOyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBoYXNoRGF0YSArPSBwcm9wLnRvU3RyaW5nKCkgKyAnOyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoYXNoRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgc2VyaWFsaXplRGVmaW5lcyxcclxuICAgIHNlcmlhbGl6ZVBhc3NlcyxcclxuICAgIHNlcmlhbGl6ZVVuaWZvcm1zXHJcbn07Il0sInNvdXJjZVJvb3QiOiIvIn0=