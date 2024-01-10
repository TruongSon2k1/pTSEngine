
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/murmurhash2_gc.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = murmurhash2_32_gc;

/**
 * JS Implementation of MurmurHash2
 * 
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 * 
 * @param {string} str ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash
 */
function murmurhash2_32_gc(str, seed) {
  var l = str.length,
      h = seed ^ l,
      i = 0,
      k;

  while (l >= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    k ^= k >>> 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  }

  h ^= h >>> 13;
  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  h ^= h >>> 15;
  return h >>> 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxtdXJtdXJoYXNoMl9nYy5qcyJdLCJuYW1lcyI6WyJtdXJtdXJoYXNoMl8zMl9nYyIsInN0ciIsInNlZWQiLCJsIiwibGVuZ3RoIiwiaCIsImkiLCJrIiwiY2hhckNvZGVBdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVlLFNBQVNBLGlCQUFULENBQTJCQyxHQUEzQixFQUFnQ0MsSUFBaEMsRUFBc0M7QUFDbkQsTUFDRUMsQ0FBQyxHQUFHRixHQUFHLENBQUNHLE1BRFY7QUFBQSxNQUVFQyxDQUFDLEdBQUdILElBQUksR0FBR0MsQ0FGYjtBQUFBLE1BR0VHLENBQUMsR0FBRyxDQUhOO0FBQUEsTUFJRUMsQ0FKRjs7QUFNQSxTQUFPSixDQUFDLElBQUksQ0FBWixFQUFlO0FBQ2RJLElBQUFBLENBQUMsR0FDR04sR0FBRyxDQUFDTyxVQUFKLENBQWVGLENBQWYsSUFBb0IsSUFBdEIsR0FDQyxDQUFDTCxHQUFHLENBQUNPLFVBQUosQ0FBZSxFQUFFRixDQUFqQixJQUFzQixJQUF2QixLQUFnQyxDQURqQyxHQUVDLENBQUNMLEdBQUcsQ0FBQ08sVUFBSixDQUFlLEVBQUVGLENBQWpCLElBQXNCLElBQXZCLEtBQWdDLEVBRmpDLEdBR0MsQ0FBQ0wsR0FBRyxDQUFDTyxVQUFKLENBQWUsRUFBRUYsQ0FBakIsSUFBc0IsSUFBdkIsS0FBZ0MsRUFKbkM7QUFNQ0MsSUFBQUEsQ0FBQyxHQUFLLENBQUNBLENBQUMsR0FBRyxNQUFMLElBQWUsVUFBaEIsSUFBK0IsQ0FBRSxDQUFDQSxDQUFDLEtBQUssRUFBUCxJQUFhLFVBQWQsR0FBNEIsTUFBN0IsS0FBd0MsRUFBdkUsQ0FBTDtBQUNBQSxJQUFBQSxDQUFDLElBQUlBLENBQUMsS0FBSyxFQUFYO0FBQ0FBLElBQUFBLENBQUMsR0FBSyxDQUFDQSxDQUFDLEdBQUcsTUFBTCxJQUFlLFVBQWhCLElBQStCLENBQUUsQ0FBQ0EsQ0FBQyxLQUFLLEVBQVAsSUFBYSxVQUFkLEdBQTRCLE1BQTdCLEtBQXdDLEVBQXZFLENBQUw7QUFFSEYsSUFBQUEsQ0FBQyxHQUFLLENBQUNBLENBQUMsR0FBRyxNQUFMLElBQWUsVUFBaEIsSUFBK0IsQ0FBRSxDQUFDQSxDQUFDLEtBQUssRUFBUCxJQUFhLFVBQWQsR0FBNEIsTUFBN0IsS0FBd0MsRUFBdkUsQ0FBRCxHQUErRUUsQ0FBbkY7QUFFR0osSUFBQUEsQ0FBQyxJQUFJLENBQUw7QUFDQSxNQUFFRyxDQUFGO0FBQ0Q7O0FBRUQsVUFBUUgsQ0FBUjtBQUNBLFNBQUssQ0FBTDtBQUFRRSxNQUFBQSxDQUFDLElBQUksQ0FBQ0osR0FBRyxDQUFDTyxVQUFKLENBQWVGLENBQUMsR0FBRyxDQUFuQixJQUF3QixJQUF6QixLQUFrQyxFQUF2Qzs7QUFDUixTQUFLLENBQUw7QUFBUUQsTUFBQUEsQ0FBQyxJQUFJLENBQUNKLEdBQUcsQ0FBQ08sVUFBSixDQUFlRixDQUFDLEdBQUcsQ0FBbkIsSUFBd0IsSUFBekIsS0FBa0MsQ0FBdkM7O0FBQ1IsU0FBSyxDQUFMO0FBQVFELE1BQUFBLENBQUMsSUFBS0osR0FBRyxDQUFDTyxVQUFKLENBQWVGLENBQWYsSUFBb0IsSUFBMUI7QUFDQUQsTUFBQUEsQ0FBQyxHQUFLLENBQUNBLENBQUMsR0FBRyxNQUFMLElBQWUsVUFBaEIsSUFBK0IsQ0FBRSxDQUFDQSxDQUFDLEtBQUssRUFBUCxJQUFhLFVBQWQsR0FBNEIsTUFBN0IsS0FBd0MsRUFBdkUsQ0FBTDtBQUpSOztBQU9BQSxFQUFBQSxDQUFDLElBQUlBLENBQUMsS0FBSyxFQUFYO0FBQ0FBLEVBQUFBLENBQUMsR0FBSyxDQUFDQSxDQUFDLEdBQUcsTUFBTCxJQUFlLFVBQWhCLElBQStCLENBQUUsQ0FBQ0EsQ0FBQyxLQUFLLEVBQVAsSUFBYSxVQUFkLEdBQTRCLE1BQTdCLEtBQXdDLEVBQXZFLENBQUw7QUFDQUEsRUFBQUEsQ0FBQyxJQUFJQSxDQUFDLEtBQUssRUFBWDtBQUVBLFNBQU9BLENBQUMsS0FBSyxDQUFiO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogSlMgSW1wbGVtZW50YXRpb24gb2YgTXVybXVySGFzaDJcclxuICogXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpnYXJ5LmNvdXJ0QGdtYWlsLmNvbVwiPkdhcnkgQ291cnQ8L2E+XHJcbiAqIEBzZWUgaHR0cDovL2dpdGh1Yi5jb20vZ2FyeWNvdXJ0L211cm11cmhhc2gtanNcclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmFhcHBsZWJ5QGdtYWlsLmNvbVwiPkF1c3RpbiBBcHBsZWJ5PC9hPlxyXG4gKiBAc2VlIGh0dHA6Ly9zaXRlcy5nb29nbGUuY29tL3NpdGUvbXVybXVyaGFzaC9cclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgQVNDSUkgb25seVxyXG4gKiBAcGFyYW0ge251bWJlcn0gc2VlZCBQb3NpdGl2ZSBpbnRlZ2VyIG9ubHlcclxuICogQHJldHVybiB7bnVtYmVyfSAzMi1iaXQgcG9zaXRpdmUgaW50ZWdlciBoYXNoXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbXVybXVyaGFzaDJfMzJfZ2Moc3RyLCBzZWVkKSB7XHJcbiAgdmFyXHJcbiAgICBsID0gc3RyLmxlbmd0aCxcclxuICAgIGggPSBzZWVkIF4gbCxcclxuICAgIGkgPSAwLFxyXG4gICAgaztcclxuICBcclxuICB3aGlsZSAobCA+PSA0KSB7XHJcbiAgXHRrID0gXHJcbiAgXHQgICgoc3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKSkgfFxyXG4gIFx0ICAoKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCA4KSB8XHJcbiAgXHQgICgoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4ZmYpIDw8IDE2KSB8XHJcbiAgXHQgICgoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4ZmYpIDw8IDI0KTtcclxuICAgIFxyXG4gICAgayA9ICgoKGsgJiAweGZmZmYpICogMHg1YmQxZTk5NSkgKyAoKCgoayA+Pj4gMTYpICogMHg1YmQxZTk5NSkgJiAweGZmZmYpIDw8IDE2KSk7XHJcbiAgICBrIF49IGsgPj4+IDI0O1xyXG4gICAgayA9ICgoKGsgJiAweGZmZmYpICogMHg1YmQxZTk5NSkgKyAoKCgoayA+Pj4gMTYpICogMHg1YmQxZTk5NSkgJiAweGZmZmYpIDw8IDE2KSk7XHJcblxyXG5cdGggPSAoKChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUpICsgKCgoKGggPj4+IDE2KSAqIDB4NWJkMWU5OTUpICYgMHhmZmZmKSA8PCAxNikpIF4gaztcclxuXHJcbiAgICBsIC09IDQ7XHJcbiAgICArK2k7XHJcbiAgfVxyXG4gIFxyXG4gIHN3aXRjaCAobCkge1xyXG4gIGNhc2UgMzogaCBePSAoc3RyLmNoYXJDb2RlQXQoaSArIDIpICYgMHhmZikgPDwgMTY7XHJcbiAgY2FzZSAyOiBoIF49IChzdHIuY2hhckNvZGVBdChpICsgMSkgJiAweGZmKSA8PCA4O1xyXG4gIGNhc2UgMTogaCBePSAoc3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKTtcclxuICAgICAgICAgIGggPSAoKChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUpICsgKCgoKGggPj4+IDE2KSAqIDB4NWJkMWU5OTUpICYgMHhmZmZmKSA8PCAxNikpO1xyXG4gIH1cclxuXHJcbiAgaCBePSBoID4+PiAxMztcclxuICBoID0gKCgoaCAmIDB4ZmZmZikgKiAweDViZDFlOTk1KSArICgoKChoID4+PiAxNikgKiAweDViZDFlOTk1KSAmIDB4ZmZmZikgPDwgMTYpKTtcclxuICBoIF49IGggPj4+IDE1O1xyXG5cclxuICByZXR1cm4gaCA+Pj4gMDtcclxufSJdLCJzb3VyY2VSb290IjoiLyJ9