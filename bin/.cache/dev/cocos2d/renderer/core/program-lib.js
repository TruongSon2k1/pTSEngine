
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/core/program-lib.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _gfx = _interopRequireDefault(require("../gfx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
var _shdID = 0;

function _generateDefines(tmpDefines, defines) {
  var results = [];

  for (var i = 0; i < tmpDefines.length; i++) {
    var name = tmpDefines[i].name;
    var value = defines[name];

    if (typeof value !== 'number') {
      value = value ? 1 : 0;
    }

    results.push("#define " + name + " " + value);
  }

  return results.join('\n') + '\n';
}

function _replaceMacroNums(string, tmpDefines, defines) {
  var tmp = string;

  for (var i = 0; i < tmpDefines.length; i++) {
    var name = tmpDefines[i].name;
    var value = defines[name];

    if (Number.isInteger(value)) {
      var reg = new RegExp(name, 'g');
      tmp = tmp.replace(reg, value);
    }
  }

  return tmp;
}

function _unrollLoops(string) {
  var pattern = /#pragma for (\w+) in range\(\s*(\d+)\s*,\s*(\d+)\s*\)([\s\S]+?)#pragma endFor/g;

  function replace(match, index, begin, end, snippet) {
    var unroll = '';
    var parsedBegin = parseInt(begin);
    var parsedEnd = parseInt(end);

    if (parsedBegin.isNaN || parsedEnd.isNaN) {
      console.error('Unroll For Loops Error: begin and end of range must be an int num.');
    }

    for (var i = parsedBegin; i < parsedEnd; ++i) {
      unroll += snippet.replace(new RegExp("{" + index + "}", 'g'), i);
    }

    return unroll;
  }

  return string.replace(pattern, replace);
}

function _replaceHighp(string) {
  return string.replace(/\bhighp\b/g, 'mediump');
}

var ProgramLib = /*#__PURE__*/function () {
  /**
   * @param {gfx.Device} device
   */
  function ProgramLib(device) {
    this._device = device; // register templates

    this._templates = {};
    this._cache = {};

    this._checkPrecision();
  }

  var _proto = ProgramLib.prototype;

  _proto.clear = function clear() {
    this._templates = {};
    this._cache = {};
  }
  /**
   * @param {string} name
   * @param {string} vert
   * @param {string} frag
   * @param {Object[]} defines
   *
   * @example:
   *   // this object is auto-generated from your actual shaders
   *   let program = {
   *     name: 'foobar',
   *     vert: vertTmpl,
   *     frag: fragTmpl,
   *     defines: [
   *       { name: 'shadow', type: 'boolean' },
   *       { name: 'lightCount', type: 'number', min: 1, max: 4 }
   *     ],
   *     attributes: [{ name: 'a_position', type: 'vec3' }],
   *     uniforms: [{ name: 'color', type: 'vec4' }],
   *     extensions: ['GL_OES_standard_derivatives'],
   *   };
   *   programLib.define(program);
   */
  ;

  _proto.define = function define(prog) {
    var name = prog.name,
        defines = prog.defines,
        glsl1 = prog.glsl1;

    var _ref = glsl1 || prog,
        vert = _ref.vert,
        frag = _ref.frag;

    if (this._templates[name]) {
      // console.warn(`Failed to define shader ${name}: already exists.`);
      return;
    }

    var id = ++_shdID; // calculate option mask offset

    var offset = 0;

    for (var i = 0; i < defines.length; ++i) {
      var def = defines[i];
      var cnt = 1;

      if (def.type === 'number') {
        var range = def.range || [];
        def.min = range[0] || 0;
        def.max = range[1] || 4;
        cnt = Math.ceil(Math.log2(def.max - def.min));

        def._map = function (value) {
          return value - this.min << this._offset;
        }.bind(def);
      } else {
        // boolean
        def._map = function (value) {
          if (value) {
            return 1 << this._offset;
          }

          return 0;
        }.bind(def);
      }

      def._offset = offset;
      offset += cnt;
    }

    var uniforms = prog.uniforms || [];

    if (prog.samplers) {
      for (var _i = 0; _i < prog.samplers.length; _i++) {
        uniforms.push(prog.samplers[_i]);
      }
    }

    if (prog.blocks) {
      for (var _i2 = 0; _i2 < prog.blocks.length; _i2++) {
        var _defines = prog.blocks[_i2].defines;
        var members = prog.blocks[_i2].members;

        for (var j = 0; j < members.length; j++) {
          uniforms.push({
            defines: _defines,
            name: members[j].name,
            type: members[j].type
          });
        }
      }
    } // store it


    this._templates[name] = {
      id: id,
      name: name,
      vert: vert,
      frag: frag,
      defines: defines,
      attributes: prog.attributes,
      uniforms: uniforms,
      extensions: prog.extensions
    };
  };

  _proto.getTemplate = function getTemplate(name) {
    return this._templates[name];
  }
  /**
   * Does this library has the specified program?
   * @param {string} name
   * @returns {boolean}
   */
  ;

  _proto.hasProgram = function hasProgram(name) {
    return this._templates[name] !== undefined;
  };

  _proto.getKey = function getKey(name, defines) {
    var tmpl = this._templates[name];
    var key = 0;

    for (var i = 0; i < tmpl.defines.length; ++i) {
      var tmplDefs = tmpl.defines[i];
      var value = defines[tmplDefs.name];

      if (value === undefined) {
        continue;
      }

      key |= tmplDefs._map(value);
    } // return key << 8 | tmpl.id;
    // key number maybe bigger than 32 bit, need use string to store value.


    return tmpl.id + ':' + key;
  };

  _proto.getProgram = function getProgram(pass, defines, errPrefix) {
    var key = pass._programKey = pass._programKey || this.getKey(pass._programName, defines);
    var program = this._cache[key];

    if (program) {
      return program;
    } // get template


    var tmpl = this._templates[pass._programName];

    var customDef = _generateDefines(tmpl.defines, defines);

    var vert = _replaceMacroNums(tmpl.vert, tmpl.defines, defines);

    vert = customDef + _unrollLoops(vert);

    if (!this._highpSupported) {
      vert = _replaceHighp(vert);
    }

    var frag = _replaceMacroNums(tmpl.frag, tmpl.defines, defines);

    frag = customDef + _unrollLoops(frag);

    if (!this._highpSupported) {
      frag = _replaceHighp(frag);
    }

    program = new _gfx["default"].Program(this._device, {
      vert: vert,
      frag: frag
    });
    var errors = program.link();

    if (errors) {
      var vertLines = vert.split('\n');
      var fragLines = frag.split('\n');
      var defineLength = tmpl.defines.length;
      errors.forEach(function (err) {
        var line = err.line - 1;
        var originLine = err.line - defineLength;
        var lines = err.type === 'vs' ? vertLines : fragLines; // let source = ` ${lines[line-1]}\n>${lines[line]}\n ${lines[line+1]}`;

        var source = lines[line];
        var info = err.info || "Failed to compile " + err.type + " " + err.fileID + " (ln " + originLine + "): \n " + err.message + ": \n  " + source;
        cc.error(errPrefix + " : " + info);
      });
    }

    this._cache[key] = program;
    return program;
  };

  _proto._checkPrecision = function _checkPrecision() {
    var gl = this._device._gl;
    var highpSupported = false;

    if (gl.getShaderPrecisionFormat) {
      var vertHighp = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT);
      var fragHighp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
      highpSupported = vertHighp && vertHighp.precision > 0 && fragHighp && fragHighp.precision > 0;
    }

    if (!highpSupported) {
      cc.warnID(9102);
    }

    this._highpSupported = highpSupported;
  };

  return ProgramLib;
}();

exports["default"] = ProgramLib;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxjb3JlXFxwcm9ncmFtLWxpYi5qcyJdLCJuYW1lcyI6WyJfc2hkSUQiLCJfZ2VuZXJhdGVEZWZpbmVzIiwidG1wRGVmaW5lcyIsImRlZmluZXMiLCJyZXN1bHRzIiwiaSIsImxlbmd0aCIsIm5hbWUiLCJ2YWx1ZSIsInB1c2giLCJqb2luIiwiX3JlcGxhY2VNYWNyb051bXMiLCJzdHJpbmciLCJ0bXAiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJyZWciLCJSZWdFeHAiLCJyZXBsYWNlIiwiX3Vucm9sbExvb3BzIiwicGF0dGVybiIsIm1hdGNoIiwiaW5kZXgiLCJiZWdpbiIsImVuZCIsInNuaXBwZXQiLCJ1bnJvbGwiLCJwYXJzZWRCZWdpbiIsInBhcnNlSW50IiwicGFyc2VkRW5kIiwiaXNOYU4iLCJjb25zb2xlIiwiZXJyb3IiLCJfcmVwbGFjZUhpZ2hwIiwiUHJvZ3JhbUxpYiIsImRldmljZSIsIl9kZXZpY2UiLCJfdGVtcGxhdGVzIiwiX2NhY2hlIiwiX2NoZWNrUHJlY2lzaW9uIiwiY2xlYXIiLCJkZWZpbmUiLCJwcm9nIiwiZ2xzbDEiLCJ2ZXJ0IiwiZnJhZyIsImlkIiwib2Zmc2V0IiwiZGVmIiwiY250IiwidHlwZSIsInJhbmdlIiwibWluIiwibWF4IiwiTWF0aCIsImNlaWwiLCJsb2cyIiwiX21hcCIsIl9vZmZzZXQiLCJiaW5kIiwidW5pZm9ybXMiLCJzYW1wbGVycyIsImJsb2NrcyIsIm1lbWJlcnMiLCJqIiwiYXR0cmlidXRlcyIsImV4dGVuc2lvbnMiLCJnZXRUZW1wbGF0ZSIsImhhc1Byb2dyYW0iLCJ1bmRlZmluZWQiLCJnZXRLZXkiLCJ0bXBsIiwia2V5IiwidG1wbERlZnMiLCJnZXRQcm9ncmFtIiwicGFzcyIsImVyclByZWZpeCIsIl9wcm9ncmFtS2V5IiwiX3Byb2dyYW1OYW1lIiwicHJvZ3JhbSIsImN1c3RvbURlZiIsIl9oaWdocFN1cHBvcnRlZCIsImdmeCIsIlByb2dyYW0iLCJlcnJvcnMiLCJsaW5rIiwidmVydExpbmVzIiwic3BsaXQiLCJmcmFnTGluZXMiLCJkZWZpbmVMZW5ndGgiLCJmb3JFYWNoIiwiZXJyIiwibGluZSIsIm9yaWdpbkxpbmUiLCJsaW5lcyIsInNvdXJjZSIsImluZm8iLCJmaWxlSUQiLCJtZXNzYWdlIiwiY2MiLCJnbCIsIl9nbCIsImhpZ2hwU3VwcG9ydGVkIiwiZ2V0U2hhZGVyUHJlY2lzaW9uRm9ybWF0IiwidmVydEhpZ2hwIiwiVkVSVEVYX1NIQURFUiIsIkhJR0hfRkxPQVQiLCJmcmFnSGlnaHAiLCJGUkFHTUVOVF9TSEFERVIiLCJwcmVjaXNpb24iLCJ3YXJuSUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7OztBQUZBO0FBSUEsSUFBSUEsTUFBTSxHQUFHLENBQWI7O0FBRUEsU0FBU0MsZ0JBQVQsQ0FBMEJDLFVBQTFCLEVBQXNDQyxPQUF0QyxFQUErQztBQUM3QyxNQUFJQyxPQUFPLEdBQUcsRUFBZDs7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdILFVBQVUsQ0FBQ0ksTUFBL0IsRUFBdUNELENBQUMsRUFBeEMsRUFBNEM7QUFDMUMsUUFBSUUsSUFBSSxHQUFHTCxVQUFVLENBQUNHLENBQUQsQ0FBVixDQUFjRSxJQUF6QjtBQUNBLFFBQUlDLEtBQUssR0FBR0wsT0FBTyxDQUFDSSxJQUFELENBQW5COztBQUNBLFFBQUksT0FBT0MsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM3QkEsTUFBQUEsS0FBSyxHQUFHQSxLQUFLLEdBQUcsQ0FBSCxHQUFPLENBQXBCO0FBQ0Q7O0FBQ0RKLElBQUFBLE9BQU8sQ0FBQ0ssSUFBUixjQUF3QkYsSUFBeEIsU0FBZ0NDLEtBQWhDO0FBQ0Q7O0FBQ0QsU0FBT0osT0FBTyxDQUFDTSxJQUFSLENBQWEsSUFBYixJQUFxQixJQUE1QjtBQUNEOztBQUVELFNBQVNDLGlCQUFULENBQTJCQyxNQUEzQixFQUFtQ1YsVUFBbkMsRUFBK0NDLE9BQS9DLEVB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QUcsQ0FBQ0ssSUFBSiwyQkFBaUNMLEdBQUcsQ0FBQ3pDLElBQXJDLFNBQTZDeUMsR0FBRyxDQUFDTSxNQUFqRCxhQUErREosVUFBL0QsY0FBa0ZGLEdBQUcsQ0FBQ08sT0FBdEYsY0FBc0dILE1BQWpIO0FBQ0FJLFFBQUFBLEVBQUUsQ0FBQ25FLEtBQUgsQ0FBWTRDLFNBQVosV0FBMkJvQixJQUEzQjtBQUNELE9BVkQ7QUFXRDs7QUFDRCxTQUFLMUQsTUFBTCxDQUFZa0MsR0FBWixJQUFtQk8sT0FBbkI7QUFFQSxXQUFPQSxPQUFQO0FBQ0Q7O1NBRUR4QyxrQkFBQSwyQkFBbUI7QUFDakIsUUFBSTZELEVBQUUsR0FBRyxLQUFLaEUsT0FBTCxDQUFhaUUsR0FBdEI7QUFDQSxRQUFJQyxjQUFjLEdBQUcsS0FBckI7O0FBQ0EsUUFBSUYsRUFBRSxDQUFDRyx3QkFBUCxFQUFpQztBQUM3QixVQUFJQyxTQUFTLEdBQUdKLEVBQUUsQ0FBQ0csd0JBQUgsQ0FBNEJILEVBQUUsQ0FBQ0ssYUFBL0IsRUFBOENMLEVBQUUsQ0FBQ00sVUFBakQsQ0FBaEI7QUFDQSxVQUFJQyxTQUFTLEdBQUdQLEVBQUUsQ0FBQ0csd0JBQUgsQ0FBNEJILEVBQUUsQ0FBQ1EsZUFBL0IsRUFBZ0RSLEVBQUUsQ0FBQ00sVUFBbkQsQ0FBaEI7QUFDQUosTUFBQUEsY0FBYyxHQUFJRSxTQUFTLElBQUlBLFNBQVMsQ0FBQ0ssU0FBVixHQUFzQixDQUFwQyxJQUNkRixTQUFTLElBQUlBLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQixDQUR0QztBQUVIOztBQUNELFFBQUksQ0FBQ1AsY0FBTCxFQUFxQjtBQUNuQkgsTUFBQUEsRUFBRSxDQUFDVyxNQUFILENBQVUsSUFBVjtBQUNEOztBQUNELFNBQUs3QixlQUFMLEdBQXVCcUIsY0FBdkI7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuaW1wb3J0IGdmeCBmcm9tICcuLi9nZngnO1xyXG5cclxubGV0IF9zaGRJRCA9IDA7XHJcblxyXG5mdW5jdGlvbiBfZ2VuZXJhdGVEZWZpbmVzKHRtcERlZmluZXMsIGRlZmluZXMpIHtcclxuICBsZXQgcmVzdWx0cyA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdG1wRGVmaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgbGV0IG5hbWUgPSB0bXBEZWZpbmVzW2ldLm5hbWU7XHJcbiAgICBsZXQgdmFsdWUgPSBkZWZpbmVzW25hbWVdO1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZSA/IDEgOiAwO1xyXG4gICAgfVxyXG4gICAgcmVzdWx0cy5wdXNoKGAjZGVmaW5lICR7bmFtZX0gJHt2YWx1ZX1gKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdHMuam9pbignXFxuJykgKyAnXFxuJztcclxufVxyXG5cclxuZnVuY3Rpb24gX3JlcGxhY2VNYWNyb051bXMoc3RyaW5nLCB0bXBEZWZpbmVzLCBkZWZpbmVzKSB7XHJcbiAgbGV0IHRtcCA9IHN0cmluZztcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0bXBEZWZpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsZXQgbmFtZSA9IHRtcERlZmluZXNbaV0ubmFtZTtcclxuICAgIGxldCB2YWx1ZSA9IGRlZmluZXNbbmFtZV07XHJcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkpIHtcclxuICAgICAgbGV0IHJlZyA9IG5ldyBSZWdFeHAobmFtZSwgJ2cnKTtcclxuICAgICAgdG1wID0gdG1wLnJlcGxhY2UocmVnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0bXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF91bnJvbGxMb29wcyhzdHJpbmcpIHtcclxuICBsZXQgcGF0dGVybiA9IC8jcHJhZ21hIGZvciAoXFx3KykgaW4gcmFuZ2VcXChcXHMqKFxcZCspXFxzKixcXHMqKFxcZCspXFxzKlxcKShbXFxzXFxTXSs/KSNwcmFnbWEgZW5kRm9yL2c7XHJcbiAgZnVuY3Rpb24gcmVwbGFjZShtYXRjaCwgaW5kZXgsIGJlZ2luLCBlbmQsIHNuaXBwZXQpIHtcclxuICAgIGxldCB1bnJvbGwgPSAnJztcclxuICAgIGxldCBwYXJzZWRCZWdpbiA9IHBhcnNlSW50KGJlZ2luKTtcclxuICAgIGxldCBwYXJzZWRFbmQgPSBwYXJzZUludChlbmQpO1xyXG4gICAgaWYgKHBhcnNlZEJlZ2luLmlzTmFOIHx8IHBhcnNlZEVuZC5pc05hTikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdVbnJvbGwgRm9yIExvb3BzIEVycm9yOiBiZWdpbiBhbmQgZW5kIG9mIHJhbmdlIG11c3QgYmUgYW4gaW50IG51bS4nKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSBwYXJzZWRCZWdpbjsgaSA8IHBhcnNlZEVuZDsgKytpKSB7XHJcbiAgICAgIHVucm9sbCArPSBzbmlwcGV0LnJlcGxhY2UobmV3IFJlZ0V4cChgeyR7aW5kZXh9fWAsICdnJyksIGkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVucm9sbDtcclxuICB9XHJcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHBhdHRlcm4sIHJlcGxhY2UpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfcmVwbGFjZUhpZ2hwKHN0cmluZykge1xyXG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXFxiaGlnaHBcXGIvZywgJ21lZGl1bXAnKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZ3JhbUxpYiB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtnZnguRGV2aWNlfSBkZXZpY2VcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihkZXZpY2UpIHtcclxuICAgIHRoaXMuX2RldmljZSA9IGRldmljZTtcclxuXHJcbiAgICAvLyByZWdpc3RlciB0ZW1wbGF0ZXNcclxuICAgIHRoaXMuX3RlbXBsYXRlcyA9IHt9O1xyXG4gICAgdGhpcy5fY2FjaGUgPSB7fTtcclxuXHJcbiAgICB0aGlzLl9jaGVja1ByZWNpc2lvbigpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIgKCkge1xyXG4gICAgdGhpcy5fdGVtcGxhdGVzID0ge307XHJcbiAgICB0aGlzLl9jYWNoZSA9IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmVydFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmcmFnXHJcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gZGVmaW5lc1xyXG4gICAqXHJcbiAgICogQGV4YW1wbGU6XHJcbiAgICogICAvLyB0aGlzIG9iamVjdCBpcyBhdXRvLWdlbmVyYXRlZCBmcm9tIHlvdXIgYWN0dWFsIHNoYWRlcnNcclxuICAgKiAgIGxldCBwcm9ncmFtID0ge1xyXG4gICAqICAgICBuYW1lOiAnZm9vYmFyJyxcclxuICAgKiAgICAgdmVydDogdmVydFRtcGwsXHJcbiAgICogICAgIGZyYWc6IGZyYWdUbXBsLFxyXG4gICAqICAgICBkZWZpbmVzOiBbXHJcbiAgICogICAgICAgeyBuYW1lOiAnc2hhZG93JywgdHlwZTogJ2Jvb2xlYW4nIH0sXHJcbiAgICogICAgICAgeyBuYW1lOiAnbGlnaHRDb3VudCcsIHR5cGU6ICdudW1iZXInLCBtaW46IDEsIG1heDogNCB9XHJcbiAgICogICAgIF0sXHJcbiAgICogICAgIGF0dHJpYnV0ZXM6IFt7IG5hbWU6ICdhX3Bvc2l0aW9uJywgdHlwZTogJ3ZlYzMnIH1dLFxyXG4gICAqICAgICB1bmlmb3JtczogW3sgbmFtZTogJ2NvbG9yJywgdHlwZTogJ3ZlYzQnIH1dLFxyXG4gICAqICAgICBleHRlbnNpb25zOiBbJ0dMX09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcyddLFxyXG4gICAqICAgfTtcclxuICAgKiAgIHByb2dyYW1MaWIuZGVmaW5lKHByb2dyYW0pO1xyXG4gICAqL1xyXG4gIGRlZmluZShwcm9nKSB7XHJcbiAgICBsZXQgeyBuYW1lLCBkZWZpbmVzLCBnbHNsMSB9ID0gcHJvZztcclxuICAgIGxldCB7IHZlcnQsIGZyYWcgfSA9IGdsc2wxIHx8IHByb2c7XHJcbiAgICBpZiAodGhpcy5fdGVtcGxhdGVzW25hbWVdKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUud2FybihgRmFpbGVkIHRvIGRlZmluZSBzaGFkZXIgJHtuYW1lfTogYWxyZWFkeSBleGlzdHMuYCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaWQgPSArK19zaGRJRDtcclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgb3B0aW9uIG1hc2sgb2Zmc2V0XHJcbiAgICBsZXQgb2Zmc2V0ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVmaW5lcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBsZXQgZGVmID0gZGVmaW5lc1tpXTtcclxuICAgICAgbGV0IGNudCA9IDE7XHJcblxyXG4gICAgICBpZiAoZGVmLnR5cGUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgbGV0IHJhbmdlID0gZGVmLnJhbmdlIHx8IFtdO1xyXG4gICAgICAgIGRlZi5taW4gPSByYW5nZVswXSB8fCAwO1xyXG4gICAgICAgIGRlZi5tYXggPSByYW5nZVsxXSB8fCA0O1xyXG4gICAgICAgIGNudCA9IE1hdGguY2VpbChNYXRoLmxvZzIoZGVmLm1heCAtIGRlZi5taW4pKTtcclxuXHJcbiAgICAgICAgZGVmLl9tYXAgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgIHJldHVybiAodmFsdWUgLSB0aGlzLm1pbikgPDwgdGhpcy5fb2Zmc2V0O1xyXG4gICAgICAgIH0uYmluZChkZWYpO1xyXG4gICAgICB9IGVsc2UgeyAvLyBib29sZWFuXHJcbiAgICAgICAgZGVmLl9tYXAgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMSA8PCB0aGlzLl9vZmZzZXQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9LmJpbmQoZGVmKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZGVmLl9vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgIG9mZnNldCArPSBjbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHVuaWZvcm1zID0gcHJvZy51bmlmb3JtcyB8fCBbXTtcclxuXHJcbiAgICBpZiAocHJvZy5zYW1wbGVycykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2cuc2FtcGxlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB1bmlmb3Jtcy5wdXNoKHByb2cuc2FtcGxlcnNbaV0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChwcm9nLmJsb2Nrcykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2cuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGRlZmluZXMgPSBwcm9nLmJsb2Nrc1tpXS5kZWZpbmVzO1xyXG4gICAgICAgIGxldCBtZW1iZXJzID0gcHJvZy5ibG9ja3NbaV0ubWVtYmVycztcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1lbWJlcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIHVuaWZvcm1zLnB1c2goe1xyXG4gICAgICAgICAgICBkZWZpbmVzLFxyXG4gICAgICAgICAgICBuYW1lOiBtZW1iZXJzW2pdLm5hbWUsXHJcbiAgICAgICAgICAgIHR5cGU6IG1lbWJlcnNbal0udHlwZSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RvcmUgaXRcclxuICAgIHRoaXMuX3RlbXBsYXRlc1tuYW1lXSA9IHtcclxuICAgICAgaWQsXHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIHZlcnQsXHJcbiAgICAgIGZyYWcsXHJcbiAgICAgIGRlZmluZXMsXHJcbiAgICAgIGF0dHJpYnV0ZXM6IHByb2cuYXR0cmlidXRlcyxcclxuICAgICAgdW5pZm9ybXMsXHJcbiAgICAgIGV4dGVuc2lvbnM6IHByb2cuZXh0ZW5zaW9uc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldFRlbXBsYXRlKG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZXNbbmFtZV07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEb2VzIHRoaXMgbGlicmFyeSBoYXMgdGhlIHNwZWNpZmllZCBwcm9ncmFtP1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgaGFzUHJvZ3JhbShuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGVzW25hbWVdICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBnZXRLZXkobmFtZSwgZGVmaW5lcykge1xyXG4gICAgbGV0IHRtcGwgPSB0aGlzLl90ZW1wbGF0ZXNbbmFtZV07XHJcbiAgICBsZXQga2V5ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG1wbC5kZWZpbmVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIGxldCB0bXBsRGVmcyA9IHRtcGwuZGVmaW5lc1tpXTtcclxuXHJcbiAgICAgIGxldCB2YWx1ZSA9IGRlZmluZXNbdG1wbERlZnMubmFtZV07XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGtleSB8PSB0bXBsRGVmcy5fbWFwKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm4ga2V5IDw8IDggfCB0bXBsLmlkO1xyXG4gICAgLy8ga2V5IG51bWJlciBtYXliZSBiaWdnZXIgdGhhbiAzMiBiaXQsIG5lZWQgdXNlIHN0cmluZyB0byBzdG9yZSB2YWx1ZS5cclxuICAgIHJldHVybiB0bXBsLmlkICsgJzonICsga2V5O1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvZ3JhbShwYXNzLCBkZWZpbmVzLCBlcnJQcmVmaXgpIHtcclxuICAgIGxldCBrZXkgPSBwYXNzLl9wcm9ncmFtS2V5ID0gcGFzcy5fcHJvZ3JhbUtleSB8fCB0aGlzLmdldEtleShwYXNzLl9wcm9ncmFtTmFtZSwgZGVmaW5lcyk7XHJcbiAgICBsZXQgcHJvZ3JhbSA9IHRoaXMuX2NhY2hlW2tleV07XHJcbiAgICBpZiAocHJvZ3JhbSkge1xyXG4gICAgICByZXR1cm4gcHJvZ3JhbTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgdGVtcGxhdGVcclxuICAgIGxldCB0bXBsID0gdGhpcy5fdGVtcGxhdGVzW3Bhc3MuX3Byb2dyYW1OYW1lXTtcclxuICAgIGxldCBjdXN0b21EZWYgPSBfZ2VuZXJhdGVEZWZpbmVzKHRtcGwuZGVmaW5lcywgZGVmaW5lcyk7XHJcbiAgICBsZXQgdmVydCA9IF9yZXBsYWNlTWFjcm9OdW1zKHRtcGwudmVydCwgdG1wbC5kZWZpbmVzLCBkZWZpbmVzKTtcclxuICAgIHZlcnQgPSBjdXN0b21EZWYgKyBfdW5yb2xsTG9vcHModmVydCk7XHJcbiAgICBpZiAoIXRoaXMuX2hpZ2hwU3VwcG9ydGVkKSB7XHJcbiAgICAgIHZlcnQgPSBfcmVwbGFjZUhpZ2hwKHZlcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBmcmFnID0gX3JlcGxhY2VNYWNyb051bXModG1wbC5mcmFnLCB0bXBsLmRlZmluZXMsIGRlZmluZXMpO1xyXG4gICAgZnJhZyA9IGN1c3RvbURlZiArIF91bnJvbGxMb29wcyhmcmFnKTtcclxuICAgIGlmICghdGhpcy5faGlnaHBTdXBwb3J0ZWQpIHtcclxuICAgICAgZnJhZyA9IF9yZXBsYWNlSGlnaHAoZnJhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvZ3JhbSA9IG5ldyBnZnguUHJvZ3JhbSh0aGlzLl9kZXZpY2UsIHtcclxuICAgICAgdmVydCxcclxuICAgICAgZnJhZ1xyXG4gICAgfSk7XHJcbiAgICBsZXQgZXJyb3JzID0gcHJvZ3JhbS5saW5rKCk7XHJcbiAgICBpZiAoZXJyb3JzKSB7XHJcbiAgICAgIGxldCB2ZXJ0TGluZXMgPSB2ZXJ0LnNwbGl0KCdcXG4nKTtcclxuICAgICAgbGV0IGZyYWdMaW5lcyA9IGZyYWcuc3BsaXQoJ1xcbicpO1xyXG4gICAgICBsZXQgZGVmaW5lTGVuZ3RoID0gdG1wbC5kZWZpbmVzLmxlbmd0aDtcclxuICAgICAgZXJyb3JzLmZvckVhY2goZXJyID0+IHtcclxuICAgICAgICBsZXQgbGluZSA9IGVyci5saW5lIC0gMTtcclxuICAgICAgICBsZXQgb3JpZ2luTGluZSA9IGVyci5saW5lIC0gZGVmaW5lTGVuZ3RoO1xyXG5cclxuICAgICAgICBsZXQgbGluZXMgPSBlcnIudHlwZSA9PT0gJ3ZzJyA/IHZlcnRMaW5lcyA6IGZyYWdMaW5lcztcclxuICAgICAgICAvLyBsZXQgc291cmNlID0gYCAke2xpbmVzW2xpbmUtMV19XFxuPiR7bGluZXNbbGluZV19XFxuICR7bGluZXNbbGluZSsxXX1gO1xyXG4gICAgICAgIGxldCBzb3VyY2UgPSBsaW5lc1tsaW5lXTtcclxuXHJcbiAgICAgICAgbGV0IGluZm8gPSBlcnIuaW5mbyB8fCBgRmFpbGVkIHRvIGNvbXBpbGUgJHtlcnIudHlwZX0gJHtlcnIuZmlsZUlEfSAobG4gJHtvcmlnaW5MaW5lfSk6IFxcbiAke2Vyci5tZXNzYWdlfTogXFxuICAke3NvdXJjZX1gO1xyXG4gICAgICAgIGNjLmVycm9yKGAke2VyclByZWZpeH0gOiAke2luZm99YCk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICB0aGlzLl9jYWNoZVtrZXldID0gcHJvZ3JhbTtcclxuXHJcbiAgICByZXR1cm4gcHJvZ3JhbTtcclxuICB9XHJcblxyXG4gIF9jaGVja1ByZWNpc2lvbiAoKSB7XHJcbiAgICBsZXQgZ2wgPSB0aGlzLl9kZXZpY2UuX2dsO1xyXG4gICAgbGV0IGhpZ2hwU3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICBpZiAoZ2wuZ2V0U2hhZGVyUHJlY2lzaW9uRm9ybWF0KSB7XHJcbiAgICAgICAgbGV0IHZlcnRIaWdocCA9IGdsLmdldFNoYWRlclByZWNpc2lvbkZvcm1hdChnbC5WRVJURVhfU0hBREVSLCBnbC5ISUdIX0ZMT0FUKTtcclxuICAgICAgICBsZXQgZnJhZ0hpZ2hwID0gZ2wuZ2V0U2hhZGVyUHJlY2lzaW9uRm9ybWF0KGdsLkZSQUdNRU5UX1NIQURFUiwgZ2wuSElHSF9GTE9BVCk7XHJcbiAgICAgICAgaGlnaHBTdXBwb3J0ZWQgPSAodmVydEhpZ2hwICYmIHZlcnRIaWdocC5wcmVjaXNpb24gPiAwKSAmJlxyXG4gICAgICAgICAgKGZyYWdIaWdocCAmJiBmcmFnSGlnaHAucHJlY2lzaW9uID4gMCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWhpZ2hwU3VwcG9ydGVkKSB7XHJcbiAgICAgIGNjLndhcm5JRCg5MTAyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2hpZ2hwU3VwcG9ydGVkID0gaGlnaHBTdXBwb3J0ZWQ7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9