
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/program.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _genID = 0;

function _parseError(out, type, errorLog) {
  if (!errorLog) {
    return;
  }

  errorLog.split('\n').forEach(function (msg) {
    if (msg.length < 5) {
      return;
    }

    var parts = /^ERROR:\s+(\d+):(\d+):\s*(.*)$/.exec(msg);

    if (parts) {
      out.push({
        type: type,
        fileID: parts[1] | 0,
        line: parts[2] | 0,
        message: parts[3].trim()
      });
    } else if (msg.length > 0) {
      out.push({
        type: type,
        fileID: -1,
        line: 0,
        message: msg
      });
    }
  });
}

var Program = /*#__PURE__*/function () {
  /**
   * @param {ef.GraphicsDevice} device - graphic device
   * @param {object} options - shader definition
   * @param {string} options.vert - vertex shader source code
   * @param {string} options.frag - fragment shader shader source code
   * @example
   * let prog = new Program(device, {
   *   vert: `
   *     attribute vec3 a_position;
   *     void main() {
   *       gl_Position = vec4( a_position, 1.0 );
   *     }
   *   `,
   *   frag: `
   *     precision mediump float;
   *     void main() {
   *       gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
   *     }
   *   `
   * });
   */
  function Program(device, options) {
    this._device = device; // stores gl information: { location, type }

    this._attributes = [];
    this._uniforms = [];
    this._samplers = [];
    this._errors = [];
    this._linked = false;
    this._vertSource = options.vert;
    this._fragSource = options.frag;
    this._glID = null;
    this._id = _genID++;
  }

  var _proto = Program.prototype;

  _proto.link = function link() {
    if (this._linked) {
      return;
    }

    var gl = this._device._gl;

    var vertShader = _createShader(gl, gl.VERTEX_SHADER, this._vertSource);

    var fragShader = _createShader(gl, gl.FRAGMENT_SHADER, this._fragSource);

    var program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    var failed = false;
    var errors = this._errors;

    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
      _parseError(errors, 'vs', gl.getShaderInfoLog(vertShader));

      failed = true;
    }

    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
      _parseError(errors, 'fs', gl.getShaderInfoLog(fragShader));

      failed = true;
    }

    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);

    if (failed) {
      return errors;
    }

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      errors.push({
        info: "Failed to link shader program: " + gl.getProgramInfoLog(program)
      });
      return errors;
    }

    this._glID = program; // parse attribute

    var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < numAttributes; ++i) {
      var info = gl.getActiveAttrib(program, i);
      var location = gl.getAttribLocation(program, info.name);

      this._attributes.push({
        name: info.name,
        location: location,
        type: info.type
      });
    } // parse uniform


    var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (var _i = 0; _i < numUniforms; ++_i) {
      var _info = gl.getActiveUniform(program, _i);

      var name = _info.name;

      var _location = gl.getUniformLocation(program, name);

      var isArray = name.substr(name.length - 3) === '[0]';

      if (isArray) {
        name = name.substr(0, name.length - 3);
      }

      var uniform = {
        name: name,
        location: _location,
        type: _info.type,
        size: isArray ? _info.size : undefined // used when uniform is an array

      };

      this._uniforms.push(uniform);
    }

    this._linked = true;
  };

  _proto.destroy = function destroy() {
    var gl = this._device._gl;
    gl.deleteProgram(this._glID);
    this._linked = false;
    this._glID = null;
    this._attributes = [];
    this._uniforms = [];
    this._samplers = [];
  };

  _createClass(Program, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }]);

  return Program;
}(); // ====================
// internal
// ====================


exports["default"] = Program;

function _createShader(gl, type, src) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxnZnhcXHByb2dyYW0uanMiXSwibmFtZXMiOlsiX2dlbklEIiwiX3BhcnNlRXJyb3IiLCJvdXQiLCJ0eXBlIiwiZXJyb3JMb2ciLCJzcGxpdCIsImZvckVhY2giLCJtc2ciLCJsZW5ndGgiLCJwYXJ0cyIsImV4ZWMiLCJwdXNoIiwiZmlsZUlEIiwibGluZSIsIm1lc3NhZ2UiLCJ0cmltIiwiUHJvZ3JhbSIsImRldmljZSIsIm9wdGlvbnMiLCJfZGV2aWNlIiwiX2F0dHJpYnV0ZXMiLCJfdW5pZm9ybXMiLCJfc2FtcGxlcnMiLCJfZXJyb3JzIiwiX2xpbmtlZCIsIl92ZXJ0U291cmNlIiwidmVydCIsIl9mcmFnU291cmNlIiwiZnJhZyIsIl9nbElEIiwiX2lkIiwibGluayIsImdsIiwiX2dsIiwidmVydFNoYWRlciIsIl9jcmVhdGVTaGFkZXIiLCJWRVJURVhfU0hBREVSIiwiZnJhZ1NoYWRlciIsIkZSQUdNRU5UX1NIQURFUiIsInByb2dyYW0iLCJjcmVhdGVQcm9ncmFtIiwiYXR0YWNoU2hhZGVyIiwibGlua1Byb2dyYW0iLCJmYWlsZWQiLCJlcnJvcnMiLCJnZXRTaGFkZXJQYXJhbWV0ZXIiLCJDT01QSUxFX1NUQVRVUyIsImdldFNoYWRlckluZm9Mb2ciLCJkZWxldGVTaGFkZXIiLCJnZXRQcm9ncmFtUGFyYW1ldGVyIiwiTElOS19TVEFUVVMiLCJpbmZvIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJudW1BdHRyaWJ1dGVzIiwiQUNUSVZFX0FUVFJJQlVURVMiLCJpIiwiZ2V0QWN0aXZlQXR0cmliIiwibG9jYXRpb24iLCJnZXRBdHRyaWJMb2NhdGlvbiIsIm5hbWUiLCJudW1Vbmlmb3JtcyIsIkFDVElWRV9VTklGT1JNUyIsImdldEFjdGl2ZVVuaWZvcm0iLCJnZXRVbmlmb3JtTG9jYXRpb24iLCJpc0FycmF5Iiwic3Vic3RyIiwidW5pZm9ybSIsInNpemUiLCJ1bmRlZmluZWQiLCJkZXN0cm95IiwiZGVsZXRlUHJvZ3JhbSIsInNyYyIsInNoYWRlciIsImNyZWF0ZVNoYWRlciIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHLENBQWI7O0FBRUEsU0FBU0MsV0FBVCxDQUFxQkMsR0FBckIsRUFBMEJDLElBQTFCLEVBQWdDQyxRQUFoQyxFQUEwQztBQUN4QyxNQUFHLENBQUNBLFFBQUosRUFBYTtBQUNYO0FBQ0Q7O0FBQ0RBLEVBQUFBLFFBQVEsQ0FBQ0MsS0FBVCxDQUFlLElBQWYsRUFBcUJDLE9BQXJCLENBQTZCLFVBQUFDLEdBQUcsRUFBSTtBQUNsQyxRQUFJQSxHQUFHLENBQUNDLE1BQUosR0FBYSxDQUFqQixFQUFvQjtBQUNsQjtBQUNEOztBQUVELFFBQUlDLEtBQUssR0FBRyxpQ0FBaUNDLElBQWpDLENBQXNDSCxHQUF0QyxDQUFaOztBQUNBLFFBQUlFLEtBQUosRUFBVztBQUNUUCxNQUFBQSxHQUFHLENBQUNTLElBQUosQ0FBUztBQUNQUixRQUFBQSxJQUFJLEVBQUVBLElBREM7QUFFUFMsUUFBQUEsTUFBTSxFQUFFSCxLQUFLLENBQUMsQ0FBRCxDQUFMLEdBQVcsQ0FGWjtBQUdQSSxRQUFBQSxJQUFJLEVBQUVKLEtBQUssQ0FBQyxDQUFELENBQUwsR0FBVyxDQUhWO0FBSVBLLFFBQUFBLE9BQU8sRUFBRUwsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTTSxJQUFUO0FBSkYsT0FBVDtBQU1ELEtBUEQsTUFPTyxJQUFJUixHQUFHLENBQUNDLE1BQUosR0FBYSxDQUFqQixFQUFvQjtBQUN6Qk4sTUFBQUEsR0FBRyxDQUFDUyxJQUFKLENBQVM7QUFDUFIsUUFBQUEsSUFBSSxFQUFFQSxJQURDO0FBRVBTLFFBQUFBLE1BQU0sRUFBRSxDQUFDLENBRkY7QUFHUEMsUUFBQUEsSUFBSSxFQUFFLENBSEM7QUFJUEMsUUFBQUEsT0FBTyxFQUFFUDtBQUpGLE9BQVQ7QUFNRDtBQUNGLEdBckJEO0FBc0JE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QixFQUF3QkQsR0FBeEI7QUFDQXZDLEVBQUFBLEVBQUUsQ0FBQzJDLGFBQUgsQ0FBaUJILE1BQWpCO0FBRUEsU0FBT0EsTUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsibGV0IF9nZW5JRCA9IDA7XHJcblxyXG5mdW5jdGlvbiBfcGFyc2VFcnJvcihvdXQsIHR5cGUsIGVycm9yTG9nKSB7XHJcbiAgaWYoIWVycm9yTG9nKXtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgZXJyb3JMb2cuc3BsaXQoJ1xcbicpLmZvckVhY2gobXNnID0+IHtcclxuICAgIGlmIChtc2cubGVuZ3RoIDwgNSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhcnRzID0gL15FUlJPUjpcXHMrKFxcZCspOihcXGQrKTpcXHMqKC4qKSQvLmV4ZWMobXNnKTtcclxuICAgIGlmIChwYXJ0cykge1xyXG4gICAgICBvdXQucHVzaCh7XHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICBmaWxlSUQ6IHBhcnRzWzFdIHwgMCxcclxuICAgICAgICBsaW5lOiBwYXJ0c1syXSB8IDAsXHJcbiAgICAgICAgbWVzc2FnZTogcGFydHNbM10udHJpbSgpXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2UgaWYgKG1zZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIG91dC5wdXNoKHtcclxuICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgIGZpbGVJRDogLTEsXHJcbiAgICAgICAgbGluZTogMCxcclxuICAgICAgICBtZXNzYWdlOiBtc2dcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2dyYW0ge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7ZWYuR3JhcGhpY3NEZXZpY2V9IGRldmljZSAtIGdyYXBoaWMgZGV2aWNlXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBzaGFkZXIgZGVmaW5pdGlvblxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnZlcnQgLSB2ZXJ0ZXggc2hhZGVyIHNvdXJjZSBjb2RlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuZnJhZyAtIGZyYWdtZW50IHNoYWRlciBzaGFkZXIgc291cmNlIGNvZGVcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIGxldCBwcm9nID0gbmV3IFByb2dyYW0oZGV2aWNlLCB7XHJcbiAgICogICB2ZXJ0OiBgXHJcbiAgICogICAgIGF0dHJpYnV0ZSB2ZWMzIGFfcG9zaXRpb247XHJcbiAgICogICAgIHZvaWQgbWFpbigpIHtcclxuICAgKiAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIGFfcG9zaXRpb24sIDEuMCApO1xyXG4gICAqICAgICB9XHJcbiAgICogICBgLFxyXG4gICAqICAgZnJhZzogYFxyXG4gICAqICAgICBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuICAgKiAgICAgdm9pZCBtYWluKCkge1xyXG4gICAqICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIDEuMCwgMS4wLCAxLjAsIDEuMCApO1xyXG4gICAqICAgICB9XHJcbiAgICogICBgXHJcbiAgICogfSk7XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZGV2aWNlLCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLl9kZXZpY2UgPSBkZXZpY2U7XHJcblxyXG4gICAgLy8gc3RvcmVzIGdsIGluZm9ybWF0aW9uOiB7IGxvY2F0aW9uLCB0eXBlIH1cclxuICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSBbXTtcclxuICAgIHRoaXMuX3VuaWZvcm1zID0gW107XHJcbiAgICB0aGlzLl9zYW1wbGVycyA9IFtdO1xyXG4gICAgdGhpcy5fZXJyb3JzID0gW107XHJcbiAgICB0aGlzLl9saW5rZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX3ZlcnRTb3VyY2UgPSBvcHRpb25zLnZlcnQ7XHJcbiAgICB0aGlzLl9mcmFnU291cmNlID0gb3B0aW9ucy5mcmFnO1xyXG4gICAgdGhpcy5fZ2xJRCA9IG51bGw7XHJcbiAgICB0aGlzLl9pZCA9IF9nZW5JRCsrO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gIH1cclxuXHJcbiAgbGluaygpIHtcclxuICAgIGlmICh0aGlzLl9saW5rZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBnbCA9IHRoaXMuX2RldmljZS5fZ2w7XHJcblxyXG4gICAgbGV0IHZlcnRTaGFkZXIgPSBfY3JlYXRlU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB0aGlzLl92ZXJ0U291cmNlKTtcclxuICAgIGxldCBmcmFnU2hhZGVyID0gX2NyZWF0ZVNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCB0aGlzLl9mcmFnU291cmNlKTtcclxuXHJcbiAgICBsZXQgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0U2hhZGVyKTtcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnU2hhZGVyKTtcclxuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xyXG5cclxuICAgIGxldCBmYWlsZWQgPSBmYWxzZTtcclxuICAgIGxldCBlcnJvcnMgPSB0aGlzLl9lcnJvcnM7XHJcblxyXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodmVydFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgIF9wYXJzZUVycm9yKGVycm9ycywgJ3ZzJywgZ2wuZ2V0U2hhZGVySW5mb0xvZyh2ZXJ0U2hhZGVyKSk7XHJcbiAgICAgIGZhaWxlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoZnJhZ1NoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgIF9wYXJzZUVycm9yKGVycm9ycywgJ2ZzJywgZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcmFnU2hhZGVyKSk7XHJcbiAgICAgIGZhaWxlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2wuZGVsZXRlU2hhZGVyKHZlcnRTaGFkZXIpO1xyXG4gICAgZ2wuZGVsZXRlU2hhZGVyKGZyYWdTaGFkZXIpO1xyXG5cclxuICAgIGlmIChmYWlsZWQpIHtcclxuICAgICAgcmV0dXJuIGVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XHJcbiAgICAgIGVycm9ycy5wdXNoKHtpbmZvOiBgRmFpbGVkIHRvIGxpbmsgc2hhZGVyIHByb2dyYW06ICR7Z2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSl9YH0pO1xyXG4gICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2dsSUQgPSBwcm9ncmFtO1xyXG5cclxuICAgIC8vIHBhcnNlIGF0dHJpYnV0ZVxyXG4gICAgbGV0IG51bUF0dHJpYnV0ZXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9BVFRSSUJVVEVTKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQXR0cmlidXRlczsgKytpKSB7XHJcbiAgICAgIGxldCBpbmZvID0gZ2wuZ2V0QWN0aXZlQXR0cmliKHByb2dyYW0sIGkpO1xyXG4gICAgICBsZXQgbG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBpbmZvLm5hbWUpO1xyXG5cclxuICAgICAgdGhpcy5fYXR0cmlidXRlcy5wdXNoKHtcclxuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXHJcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxyXG4gICAgICAgIHR5cGU6IGluZm8udHlwZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcGFyc2UgdW5pZm9ybVxyXG4gICAgbGV0IG51bVVuaWZvcm1zID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5BQ1RJVkVfVU5JRk9STVMpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Vbmlmb3JtczsgKytpKSB7XHJcbiAgICAgIGxldCBpbmZvID0gZ2wuZ2V0QWN0aXZlVW5pZm9ybShwcm9ncmFtLCBpKTtcclxuICAgICAgbGV0IG5hbWUgPSBpbmZvLm5hbWU7XHJcbiAgICAgIGxldCBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKTtcclxuICAgICAgbGV0IGlzQXJyYXkgPSBuYW1lLnN1YnN0cihuYW1lLmxlbmd0aCAtIDMpID09PSAnWzBdJztcclxuICAgICAgaWYgKGlzQXJyYXkpIHtcclxuICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHVuaWZvcm0gPSB7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXHJcbiAgICAgICAgdHlwZTogaW5mby50eXBlLFxyXG4gICAgICAgIHNpemU6IGlzQXJyYXkgPyBpbmZvLnNpemUgOiB1bmRlZmluZWQsIC8vIHVzZWQgd2hlbiB1bmlmb3JtIGlzIGFuIGFycmF5XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuX3VuaWZvcm1zLnB1c2godW5pZm9ybSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbGlua2VkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBsZXQgZ2wgPSB0aGlzLl9kZXZpY2UuX2dsO1xyXG4gICAgZ2wuZGVsZXRlUHJvZ3JhbSh0aGlzLl9nbElEKTtcclxuXHJcbiAgICB0aGlzLl9saW5rZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX2dsSUQgPSBudWxsO1xyXG4gICAgdGhpcy5fYXR0cmlidXRlcyA9IFtdO1xyXG4gICAgdGhpcy5fdW5pZm9ybXMgPSBbXTtcclxuICAgIHRoaXMuX3NhbXBsZXJzID0gW107XHJcbiAgfVxyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PVxyXG4vLyBpbnRlcm5hbFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PVxyXG5cclxuZnVuY3Rpb24gX2NyZWF0ZVNoYWRlcihnbCwgdHlwZSwgc3JjKSB7XHJcbiAgbGV0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcclxuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzcmMpO1xyXG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcclxuXHJcbiAgcmV0dXJuIHNoYWRlcjtcclxufSJdLCJzb3VyY2VSb290IjoiLyJ9