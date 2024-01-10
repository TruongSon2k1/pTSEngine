
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/compression/base64.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/*--
 Copyright 2009-2010 by Stefan Rusterholz.
 All rights reserved.
 You can choose between MIT and BSD-3-Clause license. License file will be added later.
 --*/
var misc = require('../core/utils/misc');

var strValue = misc.BASE64_VALUES;
/**
 * mixin cc.Codec.Base64
 */

var Base64 = {
  name: 'Jacob__Codec__Base64'
};
/**
 * <p>
 *    cc.Codec.Base64.decode(input[, unicode=false]) -> String (http://en.wikipedia.org/wiki/Base64).
 * </p>
 * @function
 * @param {String} input The base64 encoded string to decode
 * @return {String} Decodes a base64 encoded String
 * @example
 * //decode string
 * cc.Codec.Base64.decode("U29tZSBTdHJpbmc="); // => "Some String"
 */

Base64.decode = function Jacob__Codec__Base64__decode(input) {
  var output = [],
      chr1,
      chr2,
      chr3,
      enc1,
      enc2,
      enc3,
      enc4,
      i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

  while (i < input.length) {
    enc1 = strValue[input.charCodeAt(i++)];
    enc2 = strValue[input.charCodeAt(i++)];
    enc3 = strValue[input.charCodeAt(i++)];
    enc4 = strValue[input.charCodeAt(i++)];
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    output.push(String.fromCharCode(chr1));

    if (enc3 !== 64) {
      output.push(String.fromCharCode(chr2));
    }

    if (enc4 !== 64) {
      output.push(String.fromCharCode(chr3));
    }
  }

  output = output.join('');
  return output;
};
/**
 * <p>
 *    Converts an input string encoded in base64 to an array of integers whose<br/>
 *    values represent the decoded string's characters' bytes.
 * </p>
 * @function
 * @param {String} input The String to convert to an array of Integers
 * @param {Number} bytes
 * @return {Array}
 * @example
 * //decode string to array
 * var decodeArr = cc.Codec.Base64.decodeAsArray("U29tZSBTdHJpbmc=");
 */


Base64.decodeAsArray = function Jacob__Codec__Base64___decodeAsArray(input, bytes) {
  var dec = this.decode(input),
      ar = [],
      i,
      j,
      len;

  for (i = 0, len = dec.length / bytes; i < len; i++) {
    ar[i] = 0;

    for (j = bytes - 1; j >= 0; --j) {
      ar[i] += dec.charCodeAt(i * bytes + j) << j * 8;
    }
  }

  return ar;
};

module.exports = Base64;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvbXByZXNzaW9uXFxiYXNlNjQuanMiXSwibmFtZXMiOlsibWlzYyIsInJlcXVpcmUiLCJzdHJWYWx1ZSIsIkJBU0U2NF9WQUxVRVMiLCJCYXNlNjQiLCJuYW1lIiwiZGVjb2RlIiwiSmFjb2JfX0NvZGVjX19CYXNlNjRfX2RlY29kZSIsImlucHV0Iiwib3V0cHV0IiwiY2hyMSIsImNocjIiLCJjaHIzIiwiZW5jMSIsImVuYzIiLCJlbmMzIiwiZW5jNCIsImkiLCJyZXBsYWNlIiwibGVuZ3RoIiwiY2hhckNvZGVBdCIsInB1c2giLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJqb2luIiwiZGVjb2RlQXNBcnJheSIsIkphY29iX19Db2RlY19fQmFzZTY0X19fZGVjb2RlQXNBcnJheSIsImJ5dGVzIiwiZGVjIiwiYXIiLCJqIiwibGVuIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxvQkFBRCxDQUFsQjs7QUFDQSxJQUFJQyxRQUFRLEdBQUdGLElBQUksQ0FBQ0csYUFBcEI7QUFFQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHO0FBQUNDLEVBQUFBLElBQUksRUFBQztBQUFOLENBQWI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBRCxNQUFNLENBQUNFLE1BQVAsR0FBZ0IsU0FBU0MsNEJBQVQsQ0FBc0NDLEtBQXRDLEVBQTZDO0FBQ3pELE1BQUlDLE1BQU0sR0FBRyxFQUFiO0FBQUEsTUFDSUMsSUFESjtBQUFBLE1BQ1VDLElBRFY7QUFBQSxNQUNnQkMsSUFEaEI7QUFBQSxNQUVJQyxJQUZKO0FBQUEsTUFFVUMsSUFGVjtBQUFBLE1BRWdCQyxJQUZoQjtBQUFBLE1BRXNCQyxJQUZ0QjtBQUFBLE1BR0lDLENBQUMsR0FBRyxDQUhSO0FBS0FULEVBQUFBLEtBQUssR0FBR0EsS0FBSyxDQUFDVSxPQUFOLENBQWMscUJBQWQsRUFBcUMsRUFBckMsQ0FBUjs7QUFFQSxTQUFPRCxDQUFDLEdBQUdULEtBQUssQ0FBQ1csTUFBakIsRUFBeUI7QUFDckJOLElBQUFBLElBQUksR0FBR1gsUUFBUSxDQUFDTSxLQUFLLENBQUNZLFVBQU4sQ0FBaUJILENBQUMsRUFBbEIsQ0FBRCxDQUFmO0FBQ0FILElBQUFBLElBQUksR0FBR1osUUFBUSxDQUFDTSxLQUFLLENBQUNZLFVBQU4sQ0FBaUJILENBQUMsRUFBbEIsQ0FBRCxDQUFmO0FBQ0FGLElBQUFBLElBQUksR0FBR2IsUUFBUSxDQUFDTSxLQUFLLENBQUNZLFVBQU4sQ0FBaUJILENBQUMsRUFBbEIsQ0FBRCxDQUFmO0FBQ0FELElBQUFBLElBQUksR0FBR2QsUUFBUSxDQUFDTSxLQUFLLENBQUNZLFVBQU4sQ0FBaUJILENBQUMsRUFBbEIsQ0FBRCxDQUFmO0FBRUFQLElBQUFBLElBQUksR0FBSUcsSUFBSSxJQUFJLENBQVQsR0FBZUMsSUFBSSxJQUFJLENBQTlCO0FBQ0FILElBQUFBLElBQUksR0FBSSxDQUFDRyxJQUFJLEdBQUcsRUFBUixLQUFlLENBQWhCLEdBQXNCQyxJQUFJLElBQUksQ0FBckM7QUFDQUgsSUFBQUEsSUFBSSxHQUFJLENBQUNHLElBQUksR0FBRyxDQUFSLEtBQWMsQ0FBZixHQUFvQkMsSUFBM0I7QUFFQVAsSUFBQUEsTUFBTSxDQUFDWSxJQUFQLENBQVlDLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQmIsSUFBcEIsQ0FBWjs7QUFFQSxRQUFJSyxJQUFJLEtBQUssRUFBYixFQUFpQjtBQUNiTixNQUFBQSxNQUFNLENBQUNZLElBQVAsQ0FBWUMsTUFBTSxDQUFDQyxZQUFQLENBQW9CWixJQUFwQixDQUFaO0FBQ0g7O0FBQ0QsUUFBSUssSUFBSSxLQUFLLEVBQWIsRUFBaUI7QUFDYlAsTUFBQUEsTUFBTSxDQUFDWSxJQUFQLENBQVlDLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQlgsSUFBcEIsQ0FBWjtBQUNIO0FBQ0o7O0FBRURILEVBQUFBLE1BQU0sR0FBR0EsTUFBTSxDQUFDZSxJQUFQLENBQVksRUFBWixDQUFUO0FBRUEsU0FBT2YsTUFBUDtBQUNILENBL0JEO0FBaUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQUwsTUFBTSxDQUFDcUIsYUFBUCxHQUF1QixTQUFTQyxvQ0FBVCxDQUE4Q2xCLEtBQTlDLEVBQXFEbUIsS0FBckQsRUFBNEQ7QUFDL0UsTUFBSUMsR0FBRyxHQUFHLEtBQUt0QixNQUFMLENBQVlFLEtBQVosQ0FBVjtBQUFBLE1BQ0lxQixFQUFFLEdBQUcsRUFEVDtBQUFBLE1BQ2FaLENBRGI7QUFBQSxNQUNnQmEsQ0FEaEI7QUFBQSxNQUNtQkMsR0FEbkI7O0FBRUEsT0FBS2QsQ0FBQyxHQUFHLENBQUosRUFBT2MsR0FBRyxHQUFHSCxHQUFHLENBQUNULE1BQUosR0FBYVEsS0FBL0IsRUFBc0NWLENBQUMsR0FBR2MsR0FBMUMsRUFBK0NkLENBQUMsRUFBaEQsRUFBb0Q7QUFDaERZLElBQUFBLEVBQUUsQ0FBQ1osQ0FBRCxDQUFGLEdBQVEsQ0FBUjs7QUFDQSxTQUFLYSxDQUFDLEdBQUdILEtBQUssR0FBRyxDQUFqQixFQUFvQkcsQ0FBQyxJQUFJLENBQXpCLEVBQTRCLEVBQUVBLENBQTlCLEVBQWlDO0FBQzdCRCxNQUFBQSxFQUFFLENBQUNaLENBQUQsQ0FBRixJQUFTVyxHQUFHLENBQUNSLFVBQUosQ0FBZ0JILENBQUMsR0FBR1UsS0FBTCxHQUFjRyxDQUE3QixLQUFvQ0EsQ0FBQyxHQUFHLENBQWpEO0FBQ0g7QUFDSjs7QUFFRCxTQUFPRCxFQUFQO0FBQ0gsQ0FYRDs7QUFhQUcsTUFBTSxDQUFDQyxPQUFQLEdBQWlCN0IsTUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tXHJcbiBDb3B5cmlnaHQgMjAwOS0yMDEwIGJ5IFN0ZWZhbiBSdXN0ZXJob2x6LlxyXG4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuIFlvdSBjYW4gY2hvb3NlIGJldHdlZW4gTUlUIGFuZCBCU0QtMy1DbGF1c2UgbGljZW5zZS4gTGljZW5zZSBmaWxlIHdpbGwgYmUgYWRkZWQgbGF0ZXIuXHJcbiAtLSovXHJcblxyXG52YXIgbWlzYyA9IHJlcXVpcmUoJy4uL2NvcmUvdXRpbHMvbWlzYycpO1xyXG52YXIgc3RyVmFsdWUgPSBtaXNjLkJBU0U2NF9WQUxVRVM7XHJcblxyXG4vKipcclxuICogbWl4aW4gY2MuQ29kZWMuQmFzZTY0XHJcbiAqL1xyXG52YXIgQmFzZTY0ID0ge25hbWU6J0phY29iX19Db2RlY19fQmFzZTY0J307XHJcblxyXG4vKipcclxuICogPHA+XHJcbiAqICAgIGNjLkNvZGVjLkJhc2U2NC5kZWNvZGUoaW5wdXRbLCB1bmljb2RlPWZhbHNlXSkgLT4gU3RyaW5nIChodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCkuXHJcbiAqIDwvcD5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIGRlY29kZVxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IERlY29kZXMgYSBiYXNlNjQgZW5jb2RlZCBTdHJpbmdcclxuICogQGV4YW1wbGVcclxuICogLy9kZWNvZGUgc3RyaW5nXHJcbiAqIGNjLkNvZGVjLkJhc2U2NC5kZWNvZGUoXCJVMjl0WlNCVGRISnBibWM9XCIpOyAvLyA9PiBcIlNvbWUgU3RyaW5nXCJcclxuICovXHJcbkJhc2U2NC5kZWNvZGUgPSBmdW5jdGlvbiBKYWNvYl9fQ29kZWNfX0Jhc2U2NF9fZGVjb2RlKGlucHV0KSB7XHJcbiAgICB2YXIgb3V0cHV0ID0gW10sXHJcbiAgICAgICAgY2hyMSwgY2hyMiwgY2hyMyxcclxuICAgICAgICBlbmMxLCBlbmMyLCBlbmMzLCBlbmM0LFxyXG4gICAgICAgIGkgPSAwO1xyXG5cclxuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csIFwiXCIpO1xyXG5cclxuICAgIHdoaWxlIChpIDwgaW5wdXQubGVuZ3RoKSB7XHJcbiAgICAgICAgZW5jMSA9IHN0clZhbHVlW2lucHV0LmNoYXJDb2RlQXQoaSsrKV07XHJcbiAgICAgICAgZW5jMiA9IHN0clZhbHVlW2lucHV0LmNoYXJDb2RlQXQoaSsrKV07XHJcbiAgICAgICAgZW5jMyA9IHN0clZhbHVlW2lucHV0LmNoYXJDb2RlQXQoaSsrKV07XHJcbiAgICAgICAgZW5jNCA9IHN0clZhbHVlW2lucHV0LmNoYXJDb2RlQXQoaSsrKV07XHJcblxyXG4gICAgICAgIGNocjEgPSAoZW5jMSA8PCAyKSB8IChlbmMyID4+IDQpO1xyXG4gICAgICAgIGNocjIgPSAoKGVuYzIgJiAxNSkgPDwgNCkgfCAoZW5jMyA+PiAyKTtcclxuICAgICAgICBjaHIzID0gKChlbmMzICYgMykgPDwgNikgfCBlbmM0O1xyXG5cclxuICAgICAgICBvdXRwdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjEpKTtcclxuXHJcbiAgICAgICAgaWYgKGVuYzMgIT09IDY0KSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZW5jNCAhPT0gNjQpIHtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShjaHIzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG91dHB1dCA9IG91dHB1dC5qb2luKCcnKTtcclxuXHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIDxwPlxyXG4gKiAgICBDb252ZXJ0cyBhbiBpbnB1dCBzdHJpbmcgZW5jb2RlZCBpbiBiYXNlNjQgdG8gYW4gYXJyYXkgb2YgaW50ZWdlcnMgd2hvc2U8YnIvPlxyXG4gKiAgICB2YWx1ZXMgcmVwcmVzZW50IHRoZSBkZWNvZGVkIHN0cmluZydzIGNoYXJhY3RlcnMnIGJ5dGVzLlxyXG4gKiA8L3A+XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFN0cmluZyB0byBjb252ZXJ0IHRvIGFuIGFycmF5IG9mIEludGVnZXJzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBieXRlc1xyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogQGV4YW1wbGVcclxuICogLy9kZWNvZGUgc3RyaW5nIHRvIGFycmF5XHJcbiAqIHZhciBkZWNvZGVBcnIgPSBjYy5Db2RlYy5CYXNlNjQuZGVjb2RlQXNBcnJheShcIlUyOXRaU0JUZEhKcGJtYz1cIik7XHJcbiAqL1xyXG5CYXNlNjQuZGVjb2RlQXNBcnJheSA9IGZ1bmN0aW9uIEphY29iX19Db2RlY19fQmFzZTY0X19fZGVjb2RlQXNBcnJheShpbnB1dCwgYnl0ZXMpIHtcclxuICAgIHZhciBkZWMgPSB0aGlzLmRlY29kZShpbnB1dCksXHJcbiAgICAgICAgYXIgPSBbXSwgaSwgaiwgbGVuO1xyXG4gICAgZm9yIChpID0gMCwgbGVuID0gZGVjLmxlbmd0aCAvIGJ5dGVzOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBhcltpXSA9IDA7XHJcbiAgICAgICAgZm9yIChqID0gYnl0ZXMgLSAxOyBqID49IDA7IC0taikge1xyXG4gICAgICAgICAgICBhcltpXSArPSBkZWMuY2hhckNvZGVBdCgoaSAqIGJ5dGVzKSArIGopIDw8IChqICogOCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcjtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmFzZTY0O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==