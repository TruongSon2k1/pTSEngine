
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/timsort.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = _default;
// reference: https://github.com/mziccard/node-timsort

/**
 * Default minimum size of a run.
 */
var DEFAULT_MIN_MERGE = 32;
/**
 * Minimum ordered subsequece required to do galloping.
 */

var DEFAULT_MIN_GALLOPING = 7;
/**
 * Default tmp storage length. Can increase depending on the size of the
 * smallest run to merge.
 */

var DEFAULT_TMP_STORAGE_LENGTH = 256;
/**
 * Pre-computed powers of 10 for efficient lexicographic comparison of
 * small integers.
 */

var POWERS_OF_TEN = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];
/**
 * Estimate the logarithm base 10 of a small integer.
 *
 * @param {number} x - The integer to estimate the logarithm of.
 * @return {number} - The estimated logarithm of the integer.
 */

function log10(x) {
  if (x < 1e5) {
    if (x < 1e2) {
      return x < 1e1 ? 0 : 1;
    }

    if (x < 1e4) {
      return x < 1e3 ? 2 : 3;
    }

    return 4;
  }

  if (x < 1e7) {
    return x < 1e6 ? 5 : 6;
  }

  if (x < 1e9) {
    return x < 1e8 ? 7 : 8;
  }

  return 9;
}
/**
 * Default alphabetical comparison of items.
 *
 * @param {string|object|number} a - First element to compare.
 * @param {string|object|number} b - Second element to compare.
 * @return {number} - A positive number if a.toString() > b.toString(), a
 * negative number if .toString() < b.toString(), 0 otherwise.
 */


function alphabeticalCompare(a, b) {
  if (a === b) {
    return 0;
  }

  if (~~a === a && ~~b === b) {
    if (a === 0 || b === 0) {
      return a < b ? -1 : 1;
    }

    if (a < 0 || b < 0) {
      if (b >= 0) {
        return -1;
      }

      if (a >= 0) {
        return 1;
      }

      a = -a;
      b = -b;
    }

    var al = log10(a);
    var bl = log10(b);
    var t = 0;

    if (al < bl) {
      a *= POWERS_OF_TEN[bl - al - 1];
      b /= 10;
      t = -1;
    } else if (al > bl) {
      b *= POWERS_OF_TEN[al - bl - 1];
      a /= 10;
      t = 1;
    }

    if (a === b) {
      return t;
    }

    return a < b ? -1 : 1;
  }

  var aStr = String(a);
  var bStr = String(b);

  if (aStr === bStr) {
    return 0;
  }

  return aStr < bStr ? -1 : 1;
}
/**
 * Compute minimum run length for TimSort
 *
 * @param {number} n - The size of the array to sort.
 */


function minRunLength(n) {
  var r = 0;

  while (n >= DEFAULT_MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }

  return n + r;
}
/**
 * Counts the length of a monotonically ascending or strictly monotonically
 * descending sequence (run) starting at array[lo] in the range [lo, hi). If
 * the run is descending it is made ascending.
 *
 * @param {array} array - The array to reverse.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 * @param {function} compare - Item comparison function.
 * @return {number} - The length of the run.
 */


function makeAscendingRun(array, lo, hi, compare) {
  var runHi = lo + 1;

  if (runHi === hi) {
    return 1;
  } // Descending


  if (compare(array[runHi++], array[lo]) < 0) {
    while (runHi < hi && compare(array[runHi], array[runHi - 1]) < 0) {
      runHi++;
    }

    reverseRun(array, lo, runHi); // Ascending
  } else {
    while (runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0) {
      runHi++;
    }
  }

  return runHi - lo;
}
/**
 * Reverse an array in the range [lo, hi).
 *
 * @param {array} array - The array to reverse.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 */


function reverseRun(array, lo, hi) {
  hi--;

  while (lo < hi) {
    var t = array[lo];
    array[lo++] = array[hi];
    array[hi--] = t;
  }
}
/**
 * Perform the binary sort of the array in the range [lo, hi) where start is
 * the first element possibly out of order.
 *
 * @param {array} array - The array to sort.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 * @param {number} start - First element possibly out of order.
 * @param {function} compare - Item comparison function.
 */


function binaryInsertionSort(array, lo, hi, start, compare) {
  if (start === lo) {
    start++;
  }

  for (; start < hi; start++) {
    var pivot = array[start]; // Ranges of the array where pivot belongs

    var left = lo;
    var right = start;
    /*
     *   pivot >= array[i] for i in [lo, left)
     *   pivot <  array[i] for i in  in [right, start)
     */

    while (left < right) {
      var mid = left + right >>> 1;

      if (compare(pivot, array[mid]) < 0) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    /*
     * Move elements right to make room for the pivot. If there are elements
     * equal to pivot, left points to the first slot after them: this is also
     * a reason for which TimSort is stable
     */


    var n = start - left; // Switch is just an optimization for small arrays

    switch (n) {
      case 3:
        array[left + 3] = array[left + 2];

      /* falls through */

      case 2:
        array[left + 2] = array[left + 1];

      /* falls through */

      case 1:
        array[left + 1] = array[left];
        break;

      default:
        while (n > 0) {
          array[left + n] = array[left + n - 1];
          n--;
        }

    }

    array[left] = pivot;
  }
}
/**
 * Find the position at which to insert a value in a sorted range. If the range
 * contains elements equal to the value the leftmost element index is returned
 * (for stability).
 *
 * @param {number} value - Value to insert.
 * @param {array} array - The array in which to insert value.
 * @param {number} start - First element in the range.
 * @param {number} length - Length of the range.
 * @param {number} hint - The index at which to begin the search.
 * @param {function} compare - Item comparison function.
 * @return {number} - The index where to insert value.
 */


function gallopLeft(value, array, start, length, hint, compare) {
  var lastOffset = 0;
  var maxOffset = 0;
  var offset = 1;

  if (compare(value, array[start + hint]) > 0) {
    maxOffset = length - hint;

    while (offset < maxOffset && compare(value, array[start + hint + offset]) > 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    } // Make offsets relative to start


    lastOffset += hint;
    offset += hint; // value <= array[start + hint]
  } else {
    maxOffset = hint + 1;

    while (offset < maxOffset && compare(value, array[start + hint - offset]) <= 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    } // Make offsets relative to start


    var tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp;
  }
  /*
   * Now array[start+lastOffset] < value <= array[start+offset], so value
   * belongs somewhere in the range (start + lastOffset, start + offset]. Do a
   * binary search, with invariant array[start + lastOffset - 1] < value <=
   * array[start + offset].
   */


  lastOffset++;

  while (lastOffset < offset) {
    var m = lastOffset + (offset - lastOffset >>> 1);

    if (compare(value, array[start + m]) > 0) {
      lastOffset = m + 1;
    } else {
      offset = m;
    }
  }

  return offset;
}
/**
 * Find the position at which to insert a value in a sorted range. If the range
 * contains elements equal to the value the rightmost element index is returned
 * (for stability).
 *
 * @param {number} value - Value to insert.
 * @param {array} array - The array in which to insert value.
 * @param {number} start - First element in the range.
 * @param {number} length - Length of the range.
 * @param {number} hint - The index at which to begin the search.
 * @param {function} compare - Item comparison function.
 * @return {number} - The index where to insert value.
 */


function gallopRight(value, array, start, length, hint, compare) {
  var lastOffset = 0;
  var maxOffset = 0;
  var offset = 1;

  if (compare(value, array[start + hint]) < 0) {
    maxOffset = hint + 1;

    while (offset < maxOffset && compare(value, array[start + hint - offset]) < 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    } // Make offsets relative to start


    var tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp; // value >= array[start + hint]
  } else {
    maxOffset = length - hint;

    while (offset < maxOffset && compare(value, array[start + hint + offset]) >= 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    } // Make offsets relative to start


    lastOffset += hint;
    offset += hint;
  }
  /*
   * Now array[start+lastOffset] < value <= array[start+offset], so value
   * belongs somewhere in the range (start + lastOffset, start + offset]. Do a
   * binary search, with invariant array[start + lastOffset - 1] < value <=
   * array[start + offset].
   */


  lastOffset++;

  while (lastOffset < offset) {
    var m = lastOffset + (offset - lastOffset >>> 1);

    if (compare(value, array[start + m]) < 0) {
      offset = m;
    } else {
      lastOffset = m + 1;
    }
  }

  return offset;
}

var TimSort = /*#__PURE__*/function () {
  function TimSort(array, compare) {
    this.array = array;
    this.compare = compare;
    this.minGallop = DEFAULT_MIN_GALLOPING;
    this.length = array.length;
    this.tmpStorageLength = DEFAULT_TMP_STORAGE_LENGTH;

    if (this.length < 2 * DEFAULT_TMP_STORAGE_LENGTH) {
      this.tmpStorageLength = this.length >>> 1;
    }

    this.tmp = new Array(this.tmpStorageLength);
    this.stackLength = this.length < 120 ? 5 : this.length < 1542 ? 10 : this.length < 119151 ? 19 : 40;
    this.runStart = new Array(this.stackLength);
    this.runLength = new Array(this.stackLength);
    this.stackSize = 0;
  }
  /**
   * Push a new run on TimSort's stack.
   *
   * @param {number} runStart - Start index of the run in the original array.
   * @param {number} runLength - Length of the run;
   */


  var _proto = TimSort.prototype;

  _proto.pushRun = function pushRun(runStart, runLength) {
    this.runStart[this.stackSize] = runStart;
    this.runLength[this.stackSize] = runLength;
    this.stackSize += 1;
  }
  /**
   * Merge runs on TimSort's stack so that the following holds for all i:
   * 1) runLength[i - 3] > runLength[i - 2] + runLength[i - 1]
   * 2) runLength[i - 2] > runLength[i - 1]
   */
  ;

  _proto.mergeRuns = function mergeRuns() {
    while (this.stackSize > 1) {
      var n = this.stackSize - 2;

      if (n >= 1 && this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1] || n >= 2 && this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1]) {
        if (this.runLength[n - 1] < this.runLength[n + 1]) {
          n--;
        }
      } else if (this.runLength[n] > this.runLength[n + 1]) {
        break;
      }

      this.mergeAt(n);
    }
  }
  /**
   * Merge all runs on TimSort's stack until only one remains.
   */
  ;

  _proto.forceMergeRuns = function forceMergeRuns() {
    while (this.stackSize > 1) {
      var n = this.stackSize - 2;

      if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
        n--;
      }

      this.mergeAt(n);
    }
  }
  /**
   * Merge the runs on the stack at positions i and i+1. Must be always be called
   * with i=stackSize-2 or i=stackSize-3 (that is, we merge on top of the stack).
   *
   * @param {number} i - Index of the run to merge in TimSort's stack.
   */
  ;

  _proto.mergeAt = function mergeAt(i) {
    var compare = this.compare;
    var array = this.array;
    var start1 = this.runStart[i];
    var length1 = this.runLength[i];
    var start2 = this.runStart[i + 1];
    var length2 = this.runLength[i + 1];
    this.runLength[i] = length1 + length2;

    if (i === this.stackSize - 3) {
      this.runStart[i + 1] = this.runStart[i + 2];
      this.runLength[i + 1] = this.runLength[i + 2];
    }

    this.stackSize--;
    /*
     * Find where the first element in the second run goes in run1. Previous
     * elements in run1 are already in place
     */

    var k = gallopRight(array[start2], array, start1, length1, 0, compare);
    start1 += k;
    length1 -= k;

    if (length1 === 0) {
      return;
    }
    /*
     * Find where the last element in the first run goes in run2. Next elements
     * in run2 are already in place
     */


    length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare);

    if (length2 === 0) {
      return;
    }
    /*
     * Merge remaining runs. A tmp array with length = min(length1, length2) is
     * used
     */


    if (length1 <= length2) {
      this.mergeLow(start1, length1, start2, length2);
    } else {
      this.mergeHigh(start1, length1, start2, length2);
    }
  }
  /**
   * Merge two adjacent runs in a stable way. The runs must be such that the
   * first element of run1 is bigger than the first element in run2 and the
   * last element of run1 is greater than all the elements in run2.
   * The method should be called when run1.length <= run2.length as it uses
   * TimSort temporary array to store run1. Use mergeHigh if run1.length >
   * run2.length.
   *
   * @param {number} start1 - First element in run1.
   * @param {number} length1 - Length of run1.
   * @param {number} start2 - First element in run2.
   * @param {number} length2 - Length of run2.
   */
  ;

  _proto.mergeLow = function mergeLow(start1, length1, start2, length2) {
    var compare = this.compare;
    var array = this.array;
    var tmp = this.tmp;
    var i = 0;

    for (i = 0; i < length1; i++) {
      tmp[i] = array[start1 + i];
    }

    var cursor1 = 0;
    var cursor2 = start2;
    var dest = start1;
    array[dest++] = array[cursor2++];

    if (--length2 === 0) {
      for (i = 0; i < length1; i++) {
        array[dest + i] = tmp[cursor1 + i];
      }

      return;
    }

    if (length1 === 1) {
      for (i = 0; i < length2; i++) {
        array[dest + i] = array[cursor2 + i];
      }

      array[dest + length2] = tmp[cursor1];
      return;
    }

    var minGallop = this.minGallop;

    while (true) {
      var count1 = 0;
      var count2 = 0;
      var exit = false;

      do {
        if (compare(array[cursor2], tmp[cursor1]) < 0) {
          array[dest++] = array[cursor2++];
          count2++;
          count1 = 0;

          if (--length2 === 0) {
            exit = true;
            break;
          }
        } else {
          array[dest++] = tmp[cursor1++];
          count1++;
          count2 = 0;

          if (--length1 === 1) {
            exit = true;
            break;
          }
        }
      } while ((count1 | count2) < minGallop);

      if (exit) {
        break;
      }

      do {
        count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);

        if (count1 !== 0) {
          for (i = 0; i < count1; i++) {
            array[dest + i] = tmp[cursor1 + i];
          }

          dest += count1;
          cursor1 += count1;
          length1 -= count1;

          if (length1 <= 1) {
            exit = true;
            break;
          }
        }

        array[dest++] = array[cursor2++];

        if (--length2 === 0) {
          exit = true;
          break;
        }

        count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);

        if (count2 !== 0) {
          for (i = 0; i < count2; i++) {
            array[dest + i] = array[cursor2 + i];
          }

          dest += count2;
          cursor2 += count2;
          length2 -= count2;

          if (length2 === 0) {
            exit = true;
            break;
          }
        }

        array[dest++] = tmp[cursor1++];

        if (--length1 === 1) {
          exit = true;
          break;
        }

        minGallop--;
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

      if (exit) {
        break;
      }

      if (minGallop < 0) {
        minGallop = 0;
      }

      minGallop += 2;
    }

    this.minGallop = minGallop;

    if (minGallop < 1) {
      this.minGallop = 1;
    }

    if (length1 === 1) {
      for (i = 0; i < length2; i++) {
        array[dest + i] = array[cursor2 + i];
      }

      array[dest + length2] = tmp[cursor1];
    } else if (length1 === 0) {
      throw new Error('mergeLow preconditions were not respected');
    } else {
      for (i = 0; i < length1; i++) {
        array[dest + i] = tmp[cursor1 + i];
      }
    }
  }
  /**
   * Merge two adjacent runs in a stable way. The runs must be such that the
   * first element of run1 is bigger than the first element in run2 and the
   * last element of run1 is greater than all the elements in run2.
   * The method should be called when run1.length > run2.length as it uses
   * TimSort temporary array to store run2. Use mergeLow if run1.length <=
   * run2.length.
   *
   * @param {number} start1 - First element in run1.
   * @param {number} length1 - Length of run1.
   * @param {number} start2 - First element in run2.
   * @param {number} length2 - Length of run2.
   */
  ;

  _proto.mergeHigh = function mergeHigh(start1, length1, start2, length2) {
    var compare = this.compare;
    var array = this.array;
    var tmp = this.tmp;
    var i = 0;

    for (i = 0; i < length2; i++) {
      tmp[i] = array[start2 + i];
    }

    var cursor1 = start1 + length1 - 1;
    var cursor2 = length2 - 1;
    var dest = start2 + length2 - 1;
    var customCursor = 0;
    var customDest = 0;
    array[dest--] = array[cursor1--];

    if (--length1 === 0) {
      customCursor = dest - (length2 - 1);

      for (i = 0; i < length2; i++) {
        array[customCursor + i] = tmp[i];
      }

      return;
    }

    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;

      for (i = length1 - 1; i >= 0; i--) {
        array[customDest + i] = array[customCursor + i];
      }

      array[dest] = tmp[cursor2];
      return;
    }

    var minGallop = this.minGallop;

    while (true) {
      var count1 = 0;
      var count2 = 0;
      var exit = false;

      do {
        if (compare(tmp[cursor2], array[cursor1]) < 0) {
          array[dest--] = array[cursor1--];
          count1++;
          count2 = 0;

          if (--length1 === 0) {
            exit = true;
            break;
          }
        } else {
          array[dest--] = tmp[cursor2--];
          count2++;
          count1 = 0;

          if (--length2 === 1) {
            exit = true;
            break;
          }
        }
      } while ((count1 | count2) < minGallop);

      if (exit) {
        break;
      }

      do {
        count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare);

        if (count1 !== 0) {
          dest -= count1;
          cursor1 -= count1;
          length1 -= count1;
          customDest = dest + 1;
          customCursor = cursor1 + 1;

          for (i = count1 - 1; i >= 0; i--) {
            array[customDest + i] = array[customCursor + i];
          }

          if (length1 === 0) {
            exit = true;
            break;
          }
        }

        array[dest--] = tmp[cursor2--];

        if (--length2 === 1) {
          exit = true;
          break;
        }

        count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare);

        if (count2 !== 0) {
          dest -= count2;
          cursor2 -= count2;
          length2 -= count2;
          customDest = dest + 1;
          customCursor = cursor2 + 1;

          for (i = 0; i < count2; i++) {
            array[customDest + i] = tmp[customCursor + i];
          }

          if (length2 <= 1) {
            exit = true;
            break;
          }
        }

        array[dest--] = array[cursor1--];

        if (--length1 === 0) {
          exit = true;
          break;
        }

        minGallop--;
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

      if (exit) {
        break;
      }

      if (minGallop < 0) {
        minGallop = 0;
      }

      minGallop += 2;
    }

    this.minGallop = minGallop;

    if (minGallop < 1) {
      this.minGallop = 1;
    }

    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;

      for (i = length1 - 1; i >= 0; i--) {
        array[customDest + i] = array[customCursor + i];
      }

      array[dest] = tmp[cursor2];
    } else if (length2 === 0) {
      throw new Error('mergeHigh preconditions were not respected');
    } else {
      customCursor = dest - (length2 - 1);

      for (i = 0; i < length2; i++) {
        array[customCursor + i] = tmp[i];
      }
    }
  };

  return TimSort;
}();
/**
 * Sort an array in the range [lo, hi) using TimSort.
 *
 * @param {array} array - The array to sort.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 * @param {function=} compare - Item comparison function. Default is alphabetical.
 */


function _default(array, lo, hi, compare) {
  if (!Array.isArray(array)) {
    throw new TypeError('Can only sort arrays');
  }
  /*
   * Handle the case where a comparison function is not provided. We do
   * lexicographic sorting
   */


  if (lo === undefined) {
    lo = 0;
  }

  if (hi === undefined) {
    hi = array.length;
  }

  if (compare === undefined) {
    compare = alphabeticalCompare;
  }

  var remaining = hi - lo; // The array is already sorted

  if (remaining < 2) {
    return;
  }

  var runLength = 0; // On small arrays binary sort can be used directly

  if (remaining < DEFAULT_MIN_MERGE) {
    runLength = makeAscendingRun(array, lo, hi, compare);
    binaryInsertionSort(array, lo, hi, lo + runLength, compare);
    return;
  }

  var ts = new TimSort(array, compare);
  var minRun = minRunLength(remaining);

  do {
    runLength = makeAscendingRun(array, lo, hi, compare);

    if (runLength < minRun) {
      var force = remaining;

      if (force > minRun) {
        force = minRun;
      }

      binaryInsertionSort(array, lo, lo + force, lo + runLength, compare);
      runLength = force;
    } // Push new run and merge if necessary


    ts.pushRun(lo, runLength);
    ts.mergeRuns(); // Go find next run

    remaining -= runLength;
    lo += runLength;
  } while (remaining !== 0); // Force merging of remaining runs


  ts.forceMergeRuns();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxtZW1vcFxcdGltc29ydC5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX01JTl9NRVJHRSIsIkRFRkFVTFRfTUlOX0dBTExPUElORyIsIkRFRkFVTFRfVE1QX1NUT1JBR0VfTEVOR1RIIiwiUE9XRVJTX09GX1RFTiIsImxvZzEwIiwieCIsImFscGhhYmV0aWNhbENvbXBhcmUiLCJhIiwiYiIsImFsIiwiYmwiLCJ0IiwiYVN0ciIsIlN0cmluZyIsImJTdHIiLCJtaW5SdW5MZW5ndGgiLCJuIiwiciIsIm1ha2VBc2NlbmRpbmdSdW4iLCJhcnJheSIsImxvIiwiaGkiLCJjb21wYXJlIiwicnVuSGkiLCJyZXZlcnNlUnVuIiwiYmluYXJ5SW5zZXJ0aW9uU29ydCIsInN0YXJ0IiwicGl2b3QiLCJsZWZ0IiwicmlnaHQiLCJtaWQiLCJnYWxsb3BMZWZ0IiwidmFsdWUiLCJsZW5ndGgiLCJoaW50IiwibGFzdE9mZnNldCIsIm1heE9mZnNldCIsIm9mZnNldCIsInRtcCIsIm0iLCJnYWxsb3BSaWdodCIsIlRpbVNvcnQiLCJtaW5HYWxsb3AiLCJ0bXBTdG9yYWdlTGVuZ3RoIiwiQXJyYXkiLCJzdGFja0xlbmd0aCIsInJ1blN0YXJ0IiwicnVuTGVuZ3RoIiwic3RhY2tTaXplIiwicHVzaFJ1biIsIm1lcmdlUnVucyIsIm1lcmdlQXQiLCJmb3JjZU1lcmdlUnVucyIsImkiLCJzdGFydDEiLCJsZW5ndGgxIiwic3RhcnQyIiwibGVuZ3RoMiIsImsiLCJtZXJnZUxvdyIsIm1lcmdlSGlnaCIsImN1cnNvcjEiLCJjdXJzb3IyIiwiZGVzdCIsImNvdW50MSIsImNvdW50MiIsImV4aXQiLCJFcnJvciIsImN1c3RvbUN1cnNvciIsImN1c3RvbURlc3QiLCJpc0FycmF5IiwiVHlwZUVycm9yIiwidW5kZWZpbmVkIiwicmVtYWluaW5nIiwidHMiLCJtaW5SdW4iLCJmb3JjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FB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RSxHQUFHMkIsU0FBckIsRUFBZ0N6QixPQUFoQyxDQUFuQjtBQUNBO0FBQ0Q7O0FBRUQsTUFBSW9ELEVBQUUsR0FBRyxJQUFJakMsT0FBSixDQUFZdEIsS0FBWixFQUFtQkcsT0FBbkIsQ0FBVDtBQUVBLE1BQUlxRCxNQUFNLEdBQUc1RCxZQUFZLENBQUMwRCxTQUFELENBQXpCOztBQUVBLEtBQUc7QUFDRDFCLElBQUFBLFNBQVMsR0FBRzdCLGdCQUFnQixDQUFDQyxLQUFELEVBQVFDLEVBQVIsRUFBWUMsRUFBWixFQUFnQkMsT0FBaEIsQ0FBNUI7O0FBQ0EsUUFBSXlCLFNBQVMsR0FBRzRCLE1BQWhCLEVBQXdCO0FBQ3RCLFVBQUlDLEtBQUssR0FBR0gsU0FBWjs7QUFDQSxVQUFJRyxLQUFLLEdBQUdELE1BQVosRUFBb0I7QUFDbEJDLFFBQUFBLEtBQUssR0FBR0QsTUFBUjtBQUNEOztBQUVEbEQsTUFBQUEsbUJBQW1CLENBQUNOLEtBQUQsRUFBUUMsRUFBUixFQUFZQSxFQUFFLEdBQUd3RCxLQUFqQixFQUF3QnhELEVBQUUsR0FBRzJCLFNBQTdCLEVBQXdDekIsT0FBeEMsQ0FBbkI7QUFDQXlCLE1BQUFBLFNBQVMsR0FBRzZCLEtBQVo7QUFDRCxLQVZBLENBV0Q7OztBQUNBRixJQUFBQSxFQUFFLENBQUN6QixPQUFILENBQVc3QixFQUFYLEVBQWUyQixTQUFmO0FBQ0EyQixJQUFBQSxFQUFFLENBQUN4QixTQUFILEdBYkMsQ0FlRDs7QUFDQXVCLElBQUFBLFNBQVMsSUFBSTFCLFNBQWI7QUFDQTNCLElBQUFBLEVBQUUsSUFBSTJCLFNBQU47QUFFRCxHQW5CRCxRQW1CUzBCLFNBQVMsS0FBSyxDQW5CdkIsRUF6QytDLENBOEQvQzs7O0FBQ0FDLEVBQUFBLEVBQUUsQ0FBQ3RCLGNBQUg7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlZmVyZW5jZTogaHR0cHM6Ly9naXRodWIuY29tL216aWNjYXJkL25vZGUtdGltc29ydFxyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgbWluaW11bSBzaXplIG9mIGEgcnVuLlxyXG4gKi9cclxuY29uc3QgREVGQVVMVF9NSU5fTUVSR0UgPSAzMjtcclxuXHJcbi8qKlxyXG4gKiBNaW5pbXVtIG9yZGVyZWQgc3Vic2VxdWVjZSByZXF1aXJlZCB0byBkbyBnYWxsb3BpbmcuXHJcbiAqL1xyXG5jb25zdCBERUZBVUxUX01JTl9HQUxMT1BJTkcgPSA3O1xyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgdG1wIHN0b3JhZ2UgbGVuZ3RoLiBDYW4gaW5jcmVhc2UgZGVwZW5kaW5nIG9uIHRoZSBzaXplIG9mIHRoZVxyXG4gKiBzbWFsbGVzdCBydW4gdG8gbWVyZ2UuXHJcbiAqL1xyXG5jb25zdCBERUZBVUxUX1RNUF9TVE9SQUdFX0xFTkdUSCA9IDI1NjtcclxuXHJcbi8qKlxyXG4gKiBQcmUtY29tcHV0ZWQgcG93ZXJzIG9mIDEwIGZvciBlZmZpY2llbnQgbGV4aWNvZ3JhcGhpYyBjb21wYXJpc29uIG9mXHJcbiAqIHNtYWxsIGludGVnZXJzLlxyXG4gKi9cclxuY29uc3QgUE9XRVJTX09GX1RFTiA9IFsxZTAsIDFlMSwgMWUyLCAxZTMsIDFlNCwgMWU1LCAxZTYsIDFlNywgMWU4LCAxZTldXHJcblxyXG4vKipcclxuICogRXN0aW1hdGUgdGhlIGxvZ2FyaXRobSBiYXNlIDEwIG9mIGEgc21hbGwgaW50ZWdlci5cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgaW50ZWdlciB0byBlc3RpbWF0ZSB0aGUgbG9nYXJpdGhtIG9mLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IC0gVGhlIGVzdGltYXRlZCBsb2dhcml0aG0gb2YgdGhlIGludGVnZXIuXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2cxMCh4KSB7XHJcbiAgaWYgKHggPCAxZTUpIHtcclxuICAgIGlmICh4IDwgMWUyKSB7XHJcbiAgICAgIHJldHVybiB4IDwgMWUxID8gMCA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHggPCAxZTQpIHtcclxuICAgICAgcmV0dXJuIHggPCAxZTMgPyAyIDogMztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gNDtcclxuICB9XHJcblxyXG4gIGlmICh4IDwgMWU3KSB7XHJcbiAgICByZXR1cm4geCA8IDFlNiA/IDUgOiA2O1xyXG4gIH1cclxuXHJcbiAgaWYgKHggPCAxZTkpIHtcclxuICAgIHJldHVybiB4IDwgMWU4ID8gNyA6IDg7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gOTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgYWxwaGFiZXRpY2FsIGNvbXBhcmlzb24gb2YgaXRlbXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdHxudW1iZXJ9IGEgLSBGaXJzdCBlbGVtZW50IHRvIGNvbXBhcmUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdHxudW1iZXJ9IGIgLSBTZWNvbmQgZWxlbWVudCB0byBjb21wYXJlLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IC0gQSBwb3NpdGl2ZSBudW1iZXIgaWYgYS50b1N0cmluZygpID4gYi50b1N0cmluZygpLCBhXHJcbiAqIG5lZ2F0aXZlIG51bWJlciBpZiAudG9TdHJpbmcoKSA8IGIudG9TdHJpbmcoKSwgMCBvdGhlcndpc2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBhbHBoYWJldGljYWxDb21wYXJlKGEsIGIpIHtcclxuICBpZiAoYSA9PT0gYikge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICBpZiAofn5hID09PSBhICYmIH5+YiA9PT0gYikge1xyXG4gICAgaWYgKGEgPT09IDAgfHwgYiA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGEgPCAwIHx8IGIgPCAwKSB7XHJcbiAgICAgIGlmIChiID49IDApIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhID49IDApIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYSA9IC1hO1xyXG4gICAgICBiID0gLWI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWwgPSBsb2cxMChhKTtcclxuICAgIGNvbnN0IGJsID0gbG9nMTAoYik7XHJcblxyXG4gICAgbGV0IHQgPSAwO1xyXG5cclxuICAgIGlmIChhbCA8IGJsKSB7XHJcbiAgICAgIGEgKj0gUE9XRVJTX09GX1RFTltibCAtIGFsIC0gMV07XHJcbiAgICAgIGIgLz0gMTA7XHJcbiAgICAgIHQgPSAtMTtcclxuICAgIH0gZWxzZSBpZiAoYWwgPiBibCkge1xyXG4gICAgICBiICo9IFBPV0VSU19PRl9URU5bYWwgLSBibCAtIDFdO1xyXG4gICAgICBhIC89IDEwO1xyXG4gICAgICB0ID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYSA9PT0gYikge1xyXG4gICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYSA8IGIgPyAtMSA6IDE7XHJcbiAgfVxyXG5cclxuICBsZXQgYVN0ciA9IFN0cmluZyhhKTtcclxuICBsZXQgYlN0ciA9IFN0cmluZyhiKTtcclxuXHJcbiAgaWYgKGFTdHIgPT09IGJTdHIpIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGFTdHIgPCBiU3RyID8gLTEgOiAxO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBtaW5pbXVtIHJ1biBsZW5ndGggZm9yIFRpbVNvcnRcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IG4gLSBUaGUgc2l6ZSBvZiB0aGUgYXJyYXkgdG8gc29ydC5cclxuICovXHJcbmZ1bmN0aW9uIG1pblJ1bkxlbmd0aChuKSB7XHJcbiAgbGV0IHIgPSAwO1xyXG5cclxuICB3aGlsZSAobiA+PSBERUZBVUxUX01JTl9NRVJHRSkge1xyXG4gICAgciB8PSAobiAmIDEpO1xyXG4gICAgbiA+Pj0gMTtcclxuICB9XHJcblxyXG4gIHJldHVybiBuICsgcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvdW50cyB0aGUgbGVuZ3RoIG9mIGEgbW9ub3RvbmljYWxseSBhc2NlbmRpbmcgb3Igc3RyaWN0bHkgbW9ub3RvbmljYWxseVxyXG4gKiBkZXNjZW5kaW5nIHNlcXVlbmNlIChydW4pIHN0YXJ0aW5nIGF0IGFycmF5W2xvXSBpbiB0aGUgcmFuZ2UgW2xvLCBoaSkuIElmXHJcbiAqIHRoZSBydW4gaXMgZGVzY2VuZGluZyBpdCBpcyBtYWRlIGFzY2VuZGluZy5cclxuICpcclxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgdG8gcmV2ZXJzZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IGxvIC0gRmlyc3QgZWxlbWVudCBpbiB0aGUgcmFuZ2UgKGluY2x1c2l2ZSkuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaSAtIExhc3QgZWxlbWVudCBpbiB0aGUgcmFuZ2UuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbXBhcmUgLSBJdGVtIGNvbXBhcmlzb24gZnVuY3Rpb24uXHJcbiAqIEByZXR1cm4ge251bWJlcn0gLSBUaGUgbGVuZ3RoIG9mIHRoZSBydW4uXHJcbiAqL1xyXG5mdW5jdGlvbiBtYWtlQXNjZW5kaW5nUnVuKGFycmF5LCBsbywgaGksIGNvbXBhcmUpIHtcclxuICBsZXQgcnVuSGkgPSBsbyArIDE7XHJcblxyXG4gIGlmIChydW5IaSA9PT0gaGkpIHtcclxuICAgIHJldHVybiAxO1xyXG4gIH1cclxuXHJcbiAgLy8gRGVzY2VuZGluZ1xyXG4gIGlmIChjb21wYXJlKGFycmF5W3J1bkhpKytdLCBhcnJheVtsb10pIDwgMCkge1xyXG4gICAgd2hpbGUgKHJ1bkhpIDwgaGkgJiYgY29tcGFyZShhcnJheVtydW5IaV0sIGFycmF5W3J1bkhpIC0gMV0pIDwgMCkge1xyXG4gICAgICBydW5IaSsrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2VSdW4oYXJyYXksIGxvLCBydW5IaSk7XHJcbiAgICAvLyBBc2NlbmRpbmdcclxuICB9IGVsc2Uge1xyXG4gICAgd2hpbGUgKHJ1bkhpIDwgaGkgJiYgY29tcGFyZShhcnJheVtydW5IaV0sIGFycmF5W3J1bkhpIC0gMV0pID49IDApIHtcclxuICAgICAgcnVuSGkrKztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBydW5IaSAtIGxvO1xyXG59XHJcblxyXG4vKipcclxuICogUmV2ZXJzZSBhbiBhcnJheSBpbiB0aGUgcmFuZ2UgW2xvLCBoaSkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IHRvIHJldmVyc2UuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsbyAtIEZpcnN0IGVsZW1lbnQgaW4gdGhlIHJhbmdlIChpbmNsdXNpdmUpLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGkgLSBMYXN0IGVsZW1lbnQgaW4gdGhlIHJhbmdlLlxyXG4gKi9cclxuZnVuY3Rpb24gcmV2ZXJzZVJ1bihhcnJheSwgbG8sIGhpKSB7XHJcbiAgaGktLTtcclxuXHJcbiAgd2hpbGUgKGxvIDwgaGkpIHtcclxuICAgIGxldCB0ID0gYXJyYXlbbG9dO1xyXG4gICAgYXJyYXlbbG8rK10gPSBhcnJheVtoaV07XHJcbiAgICBhcnJheVtoaS0tXSA9IHQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUGVyZm9ybSB0aGUgYmluYXJ5IHNvcnQgb2YgdGhlIGFycmF5IGluIHRoZSByYW5nZSBbbG8sIGhpKSB3aGVyZSBzdGFydCBpc1xyXG4gKiB0aGUgZmlyc3QgZWxlbWVudCBwb3NzaWJseSBvdXQgb2Ygb3JkZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IHRvIHNvcnQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsbyAtIEZpcnN0IGVsZW1lbnQgaW4gdGhlIHJhbmdlIChpbmNsdXNpdmUpLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGkgLSBMYXN0IGVsZW1lbnQgaW4gdGhlIHJhbmdlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSBGaXJzdCBlbGVtZW50IHBvc3NpYmx5IG91dCBvZiBvcmRlci5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29tcGFyZSAtIEl0ZW0gY29tcGFyaXNvbiBmdW5jdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIGJpbmFyeUluc2VydGlvblNvcnQoYXJyYXksIGxvLCBoaSwgc3RhcnQsIGNvbXBhcmUpIHtcclxuICBpZiAoc3RhcnQgPT09IGxvKSB7XHJcbiAgICBzdGFydCsrO1xyXG4gIH1cclxuXHJcbiAgZm9yICg7IHN0YXJ0IDwgaGk7IHN0YXJ0KyspIHtcclxuICAgIGxldCBwaXZvdCA9IGFycmF5W3N0YXJ0XTtcclxuXHJcbiAgICAvLyBSYW5nZXMgb2YgdGhlIGFycmF5IHdoZXJlIHBpdm90IGJlbG9uZ3NcclxuICAgIGxldCBsZWZ0ID0gbG87XHJcbiAgICBsZXQgcmlnaHQgPSBzdGFydDtcclxuXHJcbiAgICAvKlxyXG4gICAgICogICBwaXZvdCA+PSBhcnJheVtpXSBmb3IgaSBpbiBbbG8sIGxlZnQpXHJcbiAgICAgKiAgIHBpdm90IDwgIGFycmF5W2ldIGZvciBpIGluICBpbiBbcmlnaHQsIHN0YXJ0KVxyXG4gICAgICovXHJcbiAgICB3aGlsZSAobGVmdCA8IHJpZ2h0KSB7XHJcbiAgICAgIGxldCBtaWQgPSAobGVmdCArIHJpZ2h0KSA+Pj4gMTtcclxuXHJcbiAgICAgIGlmIChjb21wYXJlKHBpdm90LCBhcnJheVttaWRdKSA8IDApIHtcclxuICAgICAgICByaWdodCA9IG1pZDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZWZ0ID0gbWlkICsgMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBNb3ZlIGVsZW1lbnRzIHJpZ2h0IHRvIG1ha2Ugcm9vbSBmb3IgdGhlIHBpdm90LiBJZiB0aGVyZSBhcmUgZWxlbWVudHNcclxuICAgICAqIGVxdWFsIHRvIHBpdm90LCBsZWZ0IHBvaW50cyB0byB0aGUgZmlyc3Qgc2xvdCBhZnRlciB0aGVtOiB0aGlzIGlzIGFsc29cclxuICAgICAqIGEgcmVhc29uIGZvciB3aGljaCBUaW1Tb3J0IGlzIHN0YWJsZVxyXG4gICAgICovXHJcbiAgICBsZXQgbiA9IHN0YXJ0IC0gbGVmdDtcclxuICAgIC8vIFN3aXRjaCBpcyBqdXN0IGFuIG9wdGltaXphdGlvbiBmb3Igc21hbGwgYXJyYXlzXHJcbiAgICBzd2l0Y2ggKG4pIHtcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIGFycmF5W2xlZnQgKyAzXSA9IGFycmF5W2xlZnQgKyAyXTtcclxuICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgYXJyYXlbbGVmdCArIDJdID0gYXJyYXlbbGVmdCArIDFdO1xyXG4gICAgICAvKiBmYWxscyB0aHJvdWdoICovXHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICBhcnJheVtsZWZ0ICsgMV0gPSBhcnJheVtsZWZ0XTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB3aGlsZSAobiA+IDApIHtcclxuICAgICAgICAgIGFycmF5W2xlZnQgKyBuXSA9IGFycmF5W2xlZnQgKyBuIC0gMV07XHJcbiAgICAgICAgICBuLS07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFycmF5W2xlZnRdID0gcGl2b3Q7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRmluZCB0aGUgcG9zaXRpb24gYXQgd2hpY2ggdG8gaW5zZXJ0IGEgdmFsdWUgaW4gYSBzb3J0ZWQgcmFuZ2UuIElmIHRoZSByYW5nZVxyXG4gKiBjb250YWlucyBlbGVtZW50cyBlcXVhbCB0byB0aGUgdmFsdWUgdGhlIGxlZnRtb3N0IGVsZW1lbnQgaW5kZXggaXMgcmV0dXJuZWRcclxuICogKGZvciBzdGFiaWxpdHkpLlxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBWYWx1ZSB0byBpbnNlcnQuXHJcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IGluIHdoaWNoIHRvIGluc2VydCB2YWx1ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gRmlyc3QgZWxlbWVudCBpbiB0aGUgcmFuZ2UuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBMZW5ndGggb2YgdGhlIHJhbmdlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGludCAtIFRoZSBpbmRleCBhdCB3aGljaCB0byBiZWdpbiB0aGUgc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb21wYXJlIC0gSXRlbSBjb21wYXJpc29uIGZ1bmN0aW9uLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IC0gVGhlIGluZGV4IHdoZXJlIHRvIGluc2VydCB2YWx1ZS5cclxuICovXHJcbmZ1bmN0aW9uIGdhbGxvcExlZnQodmFsdWUsIGFycmF5LCBzdGFydCwgbGVuZ3RoLCBoaW50LCBjb21wYXJlKSB7XHJcbiAgbGV0IGxhc3RPZmZzZXQgPSAwO1xyXG4gIGxldCBtYXhPZmZzZXQgPSAwO1xyXG4gIGxldCBvZmZzZXQgPSAxO1xyXG5cclxuICBpZiAoY29tcGFyZSh2YWx1ZSwgYXJyYXlbc3RhcnQgKyBoaW50XSkgPiAwKSB7XHJcbiAgICBtYXhPZmZzZXQgPSBsZW5ndGggLSBoaW50O1xyXG5cclxuICAgIHdoaWxlIChvZmZzZXQgPCBtYXhPZmZzZXQgJiYgY29tcGFyZSh2YWx1ZSwgYXJyYXlbc3RhcnQgKyBoaW50ICsgb2Zmc2V0XSkgPiAwKSB7XHJcbiAgICAgIGxhc3RPZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgIG9mZnNldCA9IChvZmZzZXQgPDwgMSkgKyAxO1xyXG5cclxuICAgICAgaWYgKG9mZnNldCA8PSAwKSB7XHJcbiAgICAgICAgb2Zmc2V0ID0gbWF4T2Zmc2V0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9mZnNldCA+IG1heE9mZnNldCkge1xyXG4gICAgICBvZmZzZXQgPSBtYXhPZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWFrZSBvZmZzZXRzIHJlbGF0aXZlIHRvIHN0YXJ0XHJcbiAgICBsYXN0T2Zmc2V0ICs9IGhpbnQ7XHJcbiAgICBvZmZzZXQgKz0gaGludDtcclxuXHJcbiAgICAvLyB2YWx1ZSA8PSBhcnJheVtzdGFydCArIGhpbnRdXHJcbiAgfSBlbHNlIHtcclxuICAgIG1heE9mZnNldCA9IGhpbnQgKyAxO1xyXG4gICAgd2hpbGUgKG9mZnNldCA8IG1heE9mZnNldCAmJiBjb21wYXJlKHZhbHVlLCBhcnJheVtzdGFydCArIGhpbnQgLSBvZmZzZXRdKSA8PSAwKSB7XHJcbiAgICAgIGxhc3RPZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgIG9mZnNldCA9IChvZmZzZXQgPDwgMSkgKyAxO1xyXG5cclxuICAgICAgaWYgKG9mZnNldCA8PSAwKSB7XHJcbiAgICAgICAgb2Zmc2V0ID0gbWF4T2Zmc2V0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAob2Zmc2V0ID4gbWF4T2Zmc2V0KSB7XHJcbiAgICAgIG9mZnNldCA9IG1heE9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNYWtlIG9mZnNldHMgcmVsYXRpdmUgdG8gc3RhcnRcclxuICAgIGxldCB0bXAgPSBsYXN0T2Zmc2V0O1xyXG4gICAgbGFzdE9mZnNldCA9IGhpbnQgLSBvZmZzZXQ7XHJcbiAgICBvZmZzZXQgPSBoaW50IC0gdG1wO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBOb3cgYXJyYXlbc3RhcnQrbGFzdE9mZnNldF0gPCB2YWx1ZSA8PSBhcnJheVtzdGFydCtvZmZzZXRdLCBzbyB2YWx1ZVxyXG4gICAqIGJlbG9uZ3Mgc29tZXdoZXJlIGluIHRoZSByYW5nZSAoc3RhcnQgKyBsYXN0T2Zmc2V0LCBzdGFydCArIG9mZnNldF0uIERvIGFcclxuICAgKiBiaW5hcnkgc2VhcmNoLCB3aXRoIGludmFyaWFudCBhcnJheVtzdGFydCArIGxhc3RPZmZzZXQgLSAxXSA8IHZhbHVlIDw9XHJcbiAgICogYXJyYXlbc3RhcnQgKyBvZmZzZXRdLlxyXG4gICAqL1xyXG4gIGxhc3RPZmZzZXQrKztcclxuICB3aGlsZSAobGFzdE9mZnNldCA8IG9mZnNldCkge1xyXG4gICAgbGV0IG0gPSBsYXN0T2Zmc2V0ICsgKChvZmZzZXQgLSBsYXN0T2Zmc2V0KSA+Pj4gMSk7XHJcblxyXG4gICAgaWYgKGNvbXBhcmUodmFsdWUsIGFycmF5W3N0YXJ0ICsgbV0pID4gMCkge1xyXG4gICAgICBsYXN0T2Zmc2V0ID0gbSArIDE7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb2Zmc2V0ID0gbTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG9mZnNldDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgdGhlIHBvc2l0aW9uIGF0IHdoaWNoIHRvIGluc2VydCBhIHZhbHVlIGluIGEgc29ydGVkIHJhbmdlLiBJZiB0aGUgcmFuZ2VcclxuICogY29udGFpbnMgZWxlbWVudHMgZXF1YWwgdG8gdGhlIHZhbHVlIHRoZSByaWdodG1vc3QgZWxlbWVudCBpbmRleCBpcyByZXR1cm5lZFxyXG4gKiAoZm9yIHN0YWJpbGl0eSkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFZhbHVlIHRvIGluc2VydC5cclxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgaW4gd2hpY2ggdG8gaW5zZXJ0IHZhbHVlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSBGaXJzdCBlbGVtZW50IGluIHRoZSByYW5nZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIExlbmd0aCBvZiB0aGUgcmFuZ2UuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaW50IC0gVGhlIGluZGV4IGF0IHdoaWNoIHRvIGJlZ2luIHRoZSBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbXBhcmUgLSBJdGVtIGNvbXBhcmlzb24gZnVuY3Rpb24uXHJcbiAqIEByZXR1cm4ge251bWJlcn0gLSBUaGUgaW5kZXggd2hlcmUgdG8gaW5zZXJ0IHZhbHVlLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2FsbG9wUmlnaHQodmFsdWUsIGFycmF5LCBzdGFydCwgbGVuZ3RoLCBoaW50LCBjb21wYXJlKSB7XHJcbiAgbGV0IGxhc3RPZmZzZXQgPSAwO1xyXG4gIGxldCBtYXhPZmZzZXQgPSAwO1xyXG4gIGxldCBvZmZzZXQgPSAxO1xyXG5cclxuICBpZiAoY29tcGFyZSh2YWx1ZSwgYXJyYXlbc3RhcnQgKyBoaW50XSkgPCAwKSB7XHJcbiAgICBtYXhPZmZzZXQgPSBoaW50ICsgMTtcclxuXHJcbiAgICB3aGlsZSAob2Zmc2V0IDwgbWF4T2Zmc2V0ICYmIGNvbXBhcmUodmFsdWUsIGFycmF5W3N0YXJ0ICsgaGludCAtIG9mZnNldF0pIDwgMCkge1xyXG4gICAgICBsYXN0T2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICBvZmZzZXQgPSAob2Zmc2V0IDw8IDEpICsgMTtcclxuXHJcbiAgICAgIGlmIChvZmZzZXQgPD0gMCkge1xyXG4gICAgICAgIG9mZnNldCA9IG1heE9mZnNldDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvZmZzZXQgPiBtYXhPZmZzZXQpIHtcclxuICAgICAgb2Zmc2V0ID0gbWF4T2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1ha2Ugb2Zmc2V0cyByZWxhdGl2ZSB0byBzdGFydFxyXG4gICAgbGV0IHRtcCA9IGxhc3RPZmZzZXQ7XHJcbiAgICBsYXN0T2Zmc2V0ID0gaGludCAtIG9mZnNldDtcclxuICAgIG9mZnNldCA9IGhpbnQgLSB0bXA7XHJcblxyXG4gICAgLy8gdmFsdWUgPj0gYXJyYXlbc3RhcnQgKyBoaW50XVxyXG4gIH0gZWxzZSB7XHJcbiAgICBtYXhPZmZzZXQgPSBsZW5ndGggLSBoaW50O1xyXG5cclxuICAgIHdoaWxlIChvZmZzZXQgPCBtYXhPZmZzZXQgJiYgY29tcGFyZSh2YWx1ZSwgYXJyYXlbc3RhcnQgKyBoaW50ICsgb2Zmc2V0XSkgPj0gMCkge1xyXG4gICAgICBsYXN0T2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICBvZmZzZXQgPSAob2Zmc2V0IDw8IDEpICsgMTtcclxuXHJcbiAgICAgIGlmIChvZmZzZXQgPD0gMCkge1xyXG4gICAgICAgIG9mZnNldCA9IG1heE9mZnNldDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvZmZzZXQgPiBtYXhPZmZzZXQpIHtcclxuICAgICAgb2Zmc2V0ID0gbWF4T2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1ha2Ugb2Zmc2V0cyByZWxhdGl2ZSB0byBzdGFydFxyXG4gICAgbGFzdE9mZnNldCArPSBoaW50O1xyXG4gICAgb2Zmc2V0ICs9IGhpbnQ7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIE5vdyBhcnJheVtzdGFydCtsYXN0T2Zmc2V0XSA8IHZhbHVlIDw9IGFycmF5W3N0YXJ0K29mZnNldF0sIHNvIHZhbHVlXHJcbiAgICogYmVsb25ncyBzb21ld2hlcmUgaW4gdGhlIHJhbmdlIChzdGFydCArIGxhc3RPZmZzZXQsIHN0YXJ0ICsgb2Zmc2V0XS4gRG8gYVxyXG4gICAqIGJpbmFyeSBzZWFyY2gsIHdpdGggaW52YXJpYW50IGFycmF5W3N0YXJ0ICsgbGFzdE9mZnNldCAtIDFdIDwgdmFsdWUgPD1cclxuICAgKiBhcnJheVtzdGFydCArIG9mZnNldF0uXHJcbiAgICovXHJcbiAgbGFzdE9mZnNldCsrO1xyXG5cclxuICB3aGlsZSAobGFzdE9mZnNldCA8IG9mZnNldCkge1xyXG4gICAgbGV0IG0gPSBsYXN0T2Zmc2V0ICsgKChvZmZzZXQgLSBsYXN0T2Zmc2V0KSA+Pj4gMSk7XHJcblxyXG4gICAgaWYgKGNvbXBhcmUodmFsdWUsIGFycmF5W3N0YXJ0ICsgbV0pIDwgMCkge1xyXG4gICAgICBvZmZzZXQgPSBtO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxhc3RPZmZzZXQgPSBtICsgMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBvZmZzZXQ7XHJcbn1cclxuXHJcbmNsYXNzIFRpbVNvcnQge1xyXG5cclxuICBjb25zdHJ1Y3RvcihhcnJheSwgY29tcGFyZSkge1xyXG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xyXG4gICAgdGhpcy5jb21wYXJlID0gY29tcGFyZTtcclxuICAgIHRoaXMubWluR2FsbG9wID0gREVGQVVMVF9NSU5fR0FMTE9QSU5HO1xyXG4gICAgdGhpcy5sZW5ndGggPSBhcnJheS5sZW5ndGg7XHJcblxyXG4gICAgdGhpcy50bXBTdG9yYWdlTGVuZ3RoID0gREVGQVVMVF9UTVBfU1RPUkFHRV9MRU5HVEg7XHJcbiAgICBpZiAodGhpcy5sZW5ndGggPCAyICogREVGQVVMVF9UTVBfU1RPUkFHRV9MRU5HVEgpIHtcclxuICAgICAgdGhpcy50bXBTdG9yYWdlTGVuZ3RoID0gdGhpcy5sZW5ndGggPj4+IDE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50bXAgPSBuZXcgQXJyYXkodGhpcy50bXBTdG9yYWdlTGVuZ3RoKTtcclxuXHJcbiAgICB0aGlzLnN0YWNrTGVuZ3RoID1cclxuICAgICAgKHRoaXMubGVuZ3RoIDwgMTIwID8gNSA6XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPCAxNTQyID8gMTAgOlxyXG4gICAgICAgICAgdGhpcy5sZW5ndGggPCAxMTkxNTEgPyAxOSA6IDQwKTtcclxuXHJcbiAgICB0aGlzLnJ1blN0YXJ0ID0gbmV3IEFycmF5KHRoaXMuc3RhY2tMZW5ndGgpO1xyXG4gICAgdGhpcy5ydW5MZW5ndGggPSBuZXcgQXJyYXkodGhpcy5zdGFja0xlbmd0aCk7XHJcbiAgICB0aGlzLnN0YWNrU2l6ZSA9IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQdXNoIGEgbmV3IHJ1biBvbiBUaW1Tb3J0J3Mgc3RhY2suXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gcnVuU3RhcnQgLSBTdGFydCBpbmRleCBvZiB0aGUgcnVuIGluIHRoZSBvcmlnaW5hbCBhcnJheS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gcnVuTGVuZ3RoIC0gTGVuZ3RoIG9mIHRoZSBydW47XHJcbiAgICovXHJcbiAgcHVzaFJ1bihydW5TdGFydCwgcnVuTGVuZ3RoKSB7XHJcbiAgICB0aGlzLnJ1blN0YXJ0W3RoaXMuc3RhY2tTaXplXSA9IHJ1blN0YXJ0O1xyXG4gICAgdGhpcy5ydW5MZW5ndGhbdGhpcy5zdGFja1NpemVdID0gcnVuTGVuZ3RoO1xyXG4gICAgdGhpcy5zdGFja1NpemUgKz0gMTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lcmdlIHJ1bnMgb24gVGltU29ydCdzIHN0YWNrIHNvIHRoYXQgdGhlIGZvbGxvd2luZyBob2xkcyBmb3IgYWxsIGk6XHJcbiAgICogMSkgcnVuTGVuZ3RoW2kgLSAzXSA+IHJ1bkxlbmd0aFtpIC0gMl0gKyBydW5MZW5ndGhbaSAtIDFdXHJcbiAgICogMikgcnVuTGVuZ3RoW2kgLSAyXSA+IHJ1bkxlbmd0aFtpIC0gMV1cclxuICAgKi9cclxuICBtZXJnZVJ1bnMoKSB7XHJcbiAgICB3aGlsZSAodGhpcy5zdGFja1NpemUgPiAxKSB7XHJcbiAgICAgIGxldCBuID0gdGhpcy5zdGFja1NpemUgLSAyO1xyXG5cclxuICAgICAgaWYgKChuID49IDEgJiZcclxuICAgICAgICB0aGlzLnJ1bkxlbmd0aFtuIC0gMV0gPD0gdGhpcy5ydW5MZW5ndGhbbl0gKyB0aGlzLnJ1bkxlbmd0aFtuICsgMV0pIHx8XHJcbiAgICAgICAgKG4gPj0gMiAmJlxyXG4gICAgICAgIHRoaXMucnVuTGVuZ3RoW24gLSAyXSA8PSB0aGlzLnJ1bkxlbmd0aFtuXSArIHRoaXMucnVuTGVuZ3RoW24gLSAxXSkpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucnVuTGVuZ3RoW24gLSAxXSA8IHRoaXMucnVuTGVuZ3RoW24gKyAxXSkge1xyXG4gICAgICAgICAgbi0tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ydW5MZW5ndGhbbl0gPiB0aGlzLnJ1bkxlbmd0aFtuICsgMV0pIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1lcmdlQXQobik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXJnZSBhbGwgcnVucyBvbiBUaW1Tb3J0J3Mgc3RhY2sgdW50aWwgb25seSBvbmUgcmVtYWlucy5cclxuICAgKi9cclxuICBmb3JjZU1lcmdlUnVucygpIHtcclxuICAgIHdoaWxlICh0aGlzLnN0YWNrU2l6ZSA+IDEpIHtcclxuICAgICAgbGV0IG4gPSB0aGlzLnN0YWNrU2l6ZSAtIDI7XHJcblxyXG4gICAgICBpZiAobiA+IDAgJiYgdGhpcy5ydW5MZW5ndGhbbiAtIDFdIDwgdGhpcy5ydW5MZW5ndGhbbiArIDFdKSB7XHJcbiAgICAgICAgbi0tO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm1lcmdlQXQobik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXJnZSB0aGUgcnVucyBvbiB0aGUgc3RhY2sgYXQgcG9zaXRpb25zIGkgYW5kIGkrMS4gTXVzdCBiZSBhbHdheXMgYmUgY2FsbGVkXHJcbiAgICogd2l0aCBpPXN0YWNrU2l6ZS0yIG9yIGk9c3RhY2tTaXplLTMgKHRoYXQgaXMsIHdlIG1lcmdlIG9uIHRvcCBvZiB0aGUgc3RhY2spLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGkgLSBJbmRleCBvZiB0aGUgcnVuIHRvIG1lcmdlIGluIFRpbVNvcnQncyBzdGFjay5cclxuICAgKi9cclxuICBtZXJnZUF0KGkpIHtcclxuICAgIGxldCBjb21wYXJlID0gdGhpcy5jb21wYXJlO1xyXG4gICAgbGV0IGFycmF5ID0gdGhpcy5hcnJheTtcclxuXHJcbiAgICBsZXQgc3RhcnQxID0gdGhpcy5ydW5TdGFydFtpXTtcclxuICAgIGxldCBsZW5ndGgxID0gdGhpcy5ydW5MZW5ndGhbaV07XHJcbiAgICBsZXQgc3RhcnQyID0gdGhpcy5ydW5TdGFydFtpICsgMV07XHJcbiAgICBsZXQgbGVuZ3RoMiA9IHRoaXMucnVuTGVuZ3RoW2kgKyAxXTtcclxuXHJcbiAgICB0aGlzLnJ1bkxlbmd0aFtpXSA9IGxlbmd0aDEgKyBsZW5ndGgyO1xyXG5cclxuICAgIGlmIChpID09PSB0aGlzLnN0YWNrU2l6ZSAtIDMpIHtcclxuICAgICAgdGhpcy5ydW5TdGFydFtpICsgMV0gPSB0aGlzLnJ1blN0YXJ0W2kgKyAyXTtcclxuICAgICAgdGhpcy5ydW5MZW5ndGhbaSArIDFdID0gdGhpcy5ydW5MZW5ndGhbaSArIDJdO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhY2tTaXplLS07XHJcblxyXG4gICAgLypcclxuICAgICAqIEZpbmQgd2hlcmUgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIHNlY29uZCBydW4gZ29lcyBpbiBydW4xLiBQcmV2aW91c1xyXG4gICAgICogZWxlbWVudHMgaW4gcnVuMSBhcmUgYWxyZWFkeSBpbiBwbGFjZVxyXG4gICAgICovXHJcbiAgICBsZXQgayA9IGdhbGxvcFJpZ2h0KGFycmF5W3N0YXJ0Ml0sIGFycmF5LCBzdGFydDEsIGxlbmd0aDEsIDAsIGNvbXBhcmUpO1xyXG4gICAgc3RhcnQxICs9IGs7XHJcbiAgICBsZW5ndGgxIC09IGs7XHJcblxyXG4gICAgaWYgKGxlbmd0aDEgPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBGaW5kIHdoZXJlIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGZpcnN0IHJ1biBnb2VzIGluIHJ1bjIuIE5leHQgZWxlbWVudHNcclxuICAgICAqIGluIHJ1bjIgYXJlIGFscmVhZHkgaW4gcGxhY2VcclxuICAgICAqL1xyXG4gICAgbGVuZ3RoMiA9IGdhbGxvcExlZnQoYXJyYXlbc3RhcnQxICsgbGVuZ3RoMSAtIDFdLCBhcnJheSwgc3RhcnQyLCBsZW5ndGgyLCBsZW5ndGgyIC0gMSwgY29tcGFyZSk7XHJcblxyXG4gICAgaWYgKGxlbmd0aDIgPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBNZXJnZSByZW1haW5pbmcgcnVucy4gQSB0bXAgYXJyYXkgd2l0aCBsZW5ndGggPSBtaW4obGVuZ3RoMSwgbGVuZ3RoMikgaXNcclxuICAgICAqIHVzZWRcclxuICAgICAqL1xyXG4gICAgaWYgKGxlbmd0aDEgPD0gbGVuZ3RoMikge1xyXG4gICAgICB0aGlzLm1lcmdlTG93KHN0YXJ0MSwgbGVuZ3RoMSwgc3RhcnQyLCBsZW5ndGgyKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1lcmdlSGlnaChzdGFydDEsIGxlbmd0aDEsIHN0YXJ0MiwgbGVuZ3RoMik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXJnZSB0d28gYWRqYWNlbnQgcnVucyBpbiBhIHN0YWJsZSB3YXkuIFRoZSBydW5zIG11c3QgYmUgc3VjaCB0aGF0IHRoZVxyXG4gICAqIGZpcnN0IGVsZW1lbnQgb2YgcnVuMSBpcyBiaWdnZXIgdGhhbiB0aGUgZmlyc3QgZWxlbWVudCBpbiBydW4yIGFuZCB0aGVcclxuICAgKiBsYXN0IGVsZW1lbnQgb2YgcnVuMSBpcyBncmVhdGVyIHRoYW4gYWxsIHRoZSBlbGVtZW50cyBpbiBydW4yLlxyXG4gICAqIFRoZSBtZXRob2Qgc2hvdWxkIGJlIGNhbGxlZCB3aGVuIHJ1bjEubGVuZ3RoIDw9IHJ1bjIubGVuZ3RoIGFzIGl0IHVzZXNcclxuICAgKiBUaW1Tb3J0IHRlbXBvcmFyeSBhcnJheSB0byBzdG9yZSBydW4xLiBVc2UgbWVyZ2VIaWdoIGlmIHJ1bjEubGVuZ3RoID5cclxuICAgKiBydW4yLmxlbmd0aC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydDEgLSBGaXJzdCBlbGVtZW50IGluIHJ1bjEuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aDEgLSBMZW5ndGggb2YgcnVuMS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQyIC0gRmlyc3QgZWxlbWVudCBpbiBydW4yLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGgyIC0gTGVuZ3RoIG9mIHJ1bjIuXHJcbiAgICovXHJcbiAgbWVyZ2VMb3coc3RhcnQxLCBsZW5ndGgxLCBzdGFydDIsIGxlbmd0aDIpIHtcclxuXHJcbiAgICBsZXQgY29tcGFyZSA9IHRoaXMuY29tcGFyZTtcclxuICAgIGxldCBhcnJheSA9IHRoaXMuYXJyYXk7XHJcbiAgICBsZXQgdG1wID0gdGhpcy50bXA7XHJcbiAgICBsZXQgaSA9IDA7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDE7IGkrKykge1xyXG4gICAgICB0bXBbaV0gPSBhcnJheVtzdGFydDEgKyBpXTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY3Vyc29yMSA9IDA7XHJcbiAgICBsZXQgY3Vyc29yMiA9IHN0YXJ0MjtcclxuICAgIGxldCBkZXN0ID0gc3RhcnQxO1xyXG5cclxuICAgIGFycmF5W2Rlc3QrK10gPSBhcnJheVtjdXJzb3IyKytdO1xyXG5cclxuICAgIGlmICgtLWxlbmd0aDIgPT09IDApIHtcclxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDE7IGkrKykge1xyXG4gICAgICAgIGFycmF5W2Rlc3QgKyBpXSA9IHRtcFtjdXJzb3IxICsgaV07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsZW5ndGgxID09PSAxKSB7XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgyOyBpKyspIHtcclxuICAgICAgICBhcnJheVtkZXN0ICsgaV0gPSBhcnJheVtjdXJzb3IyICsgaV07XHJcbiAgICAgIH1cclxuICAgICAgYXJyYXlbZGVzdCArIGxlbmd0aDJdID0gdG1wW2N1cnNvcjFdO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1pbkdhbGxvcCA9IHRoaXMubWluR2FsbG9wO1xyXG5cclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIGxldCBjb3VudDEgPSAwO1xyXG4gICAgICBsZXQgY291bnQyID0gMDtcclxuICAgICAgbGV0IGV4aXQgPSBmYWxzZTtcclxuXHJcbiAgICAgIGRvIHtcclxuICAgICAgICBpZiAoY29tcGFyZShhcnJheVtjdXJzb3IyXSwgdG1wW2N1cnNvcjFdKSA8IDApIHtcclxuICAgICAgICAgIGFycmF5W2Rlc3QrK10gPSBhcnJheVtjdXJzb3IyKytdO1xyXG4gICAgICAgICAgY291bnQyKys7XHJcbiAgICAgICAgICBjb3VudDEgPSAwO1xyXG5cclxuICAgICAgICAgIGlmICgtLWxlbmd0aDIgPT09IDApIHtcclxuICAgICAgICAgICAgZXhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXJyYXlbZGVzdCsrXSA9IHRtcFtjdXJzb3IxKytdO1xyXG4gICAgICAgICAgY291bnQxKys7XHJcbiAgICAgICAgICBjb3VudDIgPSAwO1xyXG4gICAgICAgICAgaWYgKC0tbGVuZ3RoMSA9PT0gMSkge1xyXG4gICAgICAgICAgICBleGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IHdoaWxlICgoY291bnQxIHwgY291bnQyKSA8IG1pbkdhbGxvcCk7XHJcblxyXG4gICAgICBpZiAoZXhpdCkge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkbyB7XHJcbiAgICAgICAgY291bnQxID0gZ2FsbG9wUmlnaHQoYXJyYXlbY3Vyc29yMl0sIHRtcCwgY3Vyc29yMSwgbGVuZ3RoMSwgMCwgY29tcGFyZSk7XHJcblxyXG4gICAgICAgIGlmIChjb3VudDEgIT09IDApIHtcclxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudDE7IGkrKykge1xyXG4gICAgICAgICAgICBhcnJheVtkZXN0ICsgaV0gPSB0bXBbY3Vyc29yMSArIGldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRlc3QgKz0gY291bnQxO1xyXG4gICAgICAgICAgY3Vyc29yMSArPSBjb3VudDE7XHJcbiAgICAgICAgICBsZW5ndGgxIC09IGNvdW50MTtcclxuICAgICAgICAgIGlmIChsZW5ndGgxIDw9IDEpIHtcclxuICAgICAgICAgICAgZXhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXJyYXlbZGVzdCsrXSA9IGFycmF5W2N1cnNvcjIrK107XHJcblxyXG4gICAgICAgIGlmICgtLWxlbmd0aDIgPT09IDApIHtcclxuICAgICAgICAgIGV4aXQgPSB0cnVlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb3VudDIgPSBnYWxsb3BMZWZ0KHRtcFtjdXJzb3IxXSwgYXJyYXksIGN1cnNvcjIsIGxlbmd0aDIsIDAsIGNvbXBhcmUpO1xyXG5cclxuICAgICAgICBpZiAoY291bnQyICE9PSAwKSB7XHJcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnQyOyBpKyspIHtcclxuICAgICAgICAgICAgYXJyYXlbZGVzdCArIGldID0gYXJyYXlbY3Vyc29yMiArIGldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRlc3QgKz0gY291bnQyO1xyXG4gICAgICAgICAgY3Vyc29yMiArPSBjb3VudDI7XHJcbiAgICAgICAgICBsZW5ndGgyIC09IGNvdW50MjtcclxuXHJcbiAgICAgICAgICBpZiAobGVuZ3RoMiA9PT0gMCkge1xyXG4gICAgICAgICAgICBleGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFycmF5W2Rlc3QrK10gPSB0bXBbY3Vyc29yMSsrXTtcclxuXHJcbiAgICAgICAgaWYgKC0tbGVuZ3RoMSA9PT0gMSkge1xyXG4gICAgICAgICAgZXhpdCA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1pbkdhbGxvcC0tO1xyXG5cclxuICAgICAgfSB3aGlsZSAoY291bnQxID49IERFRkFVTFRfTUlOX0dBTExPUElORyB8fCBjb3VudDIgPj0gREVGQVVMVF9NSU5fR0FMTE9QSU5HKTtcclxuXHJcbiAgICAgIGlmIChleGl0KSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChtaW5HYWxsb3AgPCAwKSB7XHJcbiAgICAgICAgbWluR2FsbG9wID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbWluR2FsbG9wICs9IDI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5taW5HYWxsb3AgPSBtaW5HYWxsb3A7XHJcblxyXG4gICAgaWYgKG1pbkdhbGxvcCA8IDEpIHtcclxuICAgICAgdGhpcy5taW5HYWxsb3AgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsZW5ndGgxID09PSAxKSB7XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgyOyBpKyspIHtcclxuICAgICAgICBhcnJheVtkZXN0ICsgaV0gPSBhcnJheVtjdXJzb3IyICsgaV07XHJcbiAgICAgIH1cclxuICAgICAgYXJyYXlbZGVzdCArIGxlbmd0aDJdID0gdG1wW2N1cnNvcjFdO1xyXG5cclxuICAgIH0gZWxzZSBpZiAobGVuZ3RoMSA9PT0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21lcmdlTG93IHByZWNvbmRpdGlvbnMgd2VyZSBub3QgcmVzcGVjdGVkJyk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDE7IGkrKykge1xyXG4gICAgICAgIGFycmF5W2Rlc3QgKyBpXSA9IHRtcFtjdXJzb3IxICsgaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lcmdlIHR3byBhZGphY2VudCBydW5zIGluIGEgc3RhYmxlIHdheS4gVGhlIHJ1bnMgbXVzdCBiZSBzdWNoIHRoYXQgdGhlXHJcbiAgICogZmlyc3QgZWxlbWVudCBvZiBydW4xIGlzIGJpZ2dlciB0aGFuIHRoZSBmaXJzdCBlbGVtZW50IGluIHJ1bjIgYW5kIHRoZVxyXG4gICAqIGxhc3QgZWxlbWVudCBvZiBydW4xIGlzIGdyZWF0ZXIgdGhhbiBhbGwgdGhlIGVsZW1lbnRzIGluIHJ1bjIuXHJcbiAgICogVGhlIG1ldGhvZCBzaG91bGQgYmUgY2FsbGVkIHdoZW4gcnVuMS5sZW5ndGggPiBydW4yLmxlbmd0aCBhcyBpdCB1c2VzXHJcbiAgICogVGltU29ydCB0ZW1wb3JhcnkgYXJyYXkgdG8gc3RvcmUgcnVuMi4gVXNlIG1lcmdlTG93IGlmIHJ1bjEubGVuZ3RoIDw9XHJcbiAgICogcnVuMi5sZW5ndGguXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQxIC0gRmlyc3QgZWxlbWVudCBpbiBydW4xLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGgxIC0gTGVuZ3RoIG9mIHJ1bjEuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0MiAtIEZpcnN0IGVsZW1lbnQgaW4gcnVuMi5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoMiAtIExlbmd0aCBvZiBydW4yLlxyXG4gICAqL1xyXG4gIG1lcmdlSGlnaChzdGFydDEsIGxlbmd0aDEsIHN0YXJ0MiwgbGVuZ3RoMikge1xyXG4gICAgbGV0IGNvbXBhcmUgPSB0aGlzLmNvbXBhcmU7XHJcbiAgICBsZXQgYXJyYXkgPSB0aGlzLmFycmF5O1xyXG4gICAgbGV0IHRtcCA9IHRoaXMudG1wO1xyXG4gICAgbGV0IGkgPSAwO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgyOyBpKyspIHtcclxuICAgICAgdG1wW2ldID0gYXJyYXlbc3RhcnQyICsgaV07XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGN1cnNvcjEgPSBzdGFydDEgKyBsZW5ndGgxIC0gMTtcclxuICAgIGxldCBjdXJzb3IyID0gbGVuZ3RoMiAtIDE7XHJcbiAgICBsZXQgZGVzdCA9IHN0YXJ0MiArIGxlbmd0aDIgLSAxO1xyXG4gICAgbGV0IGN1c3RvbUN1cnNvciA9IDA7XHJcbiAgICBsZXQgY3VzdG9tRGVzdCA9IDA7XHJcblxyXG4gICAgYXJyYXlbZGVzdC0tXSA9IGFycmF5W2N1cnNvcjEtLV07XHJcblxyXG4gICAgaWYgKC0tbGVuZ3RoMSA9PT0gMCkge1xyXG4gICAgICBjdXN0b21DdXJzb3IgPSBkZXN0IC0gKGxlbmd0aDIgLSAxKTtcclxuXHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgyOyBpKyspIHtcclxuICAgICAgICBhcnJheVtjdXN0b21DdXJzb3IgKyBpXSA9IHRtcFtpXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsZW5ndGgyID09PSAxKSB7XHJcbiAgICAgIGRlc3QgLT0gbGVuZ3RoMTtcclxuICAgICAgY3Vyc29yMSAtPSBsZW5ndGgxO1xyXG4gICAgICBjdXN0b21EZXN0ID0gZGVzdCArIDE7XHJcbiAgICAgIGN1c3RvbUN1cnNvciA9IGN1cnNvcjEgKyAxO1xyXG5cclxuICAgICAgZm9yIChpID0gbGVuZ3RoMSAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgYXJyYXlbY3VzdG9tRGVzdCArIGldID0gYXJyYXlbY3VzdG9tQ3Vyc29yICsgaV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFycmF5W2Rlc3RdID0gdG1wW2N1cnNvcjJdO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1pbkdhbGxvcCA9IHRoaXMubWluR2FsbG9wO1xyXG5cclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIGxldCBjb3VudDEgPSAwO1xyXG4gICAgICBsZXQgY291bnQyID0gMDtcclxuICAgICAgbGV0IGV4aXQgPSBmYWxzZTtcclxuXHJcbiAgICAgIGRvIHtcclxuICAgICAgICBpZiAoY29tcGFyZSh0bXBbY3Vyc29yMl0sIGFycmF5W2N1cnNvcjFdKSA8IDApIHtcclxuICAgICAgICAgIGFycmF5W2Rlc3QtLV0gPSBhcnJheVtjdXJzb3IxLS1dO1xyXG4gICAgICAgICAgY291bnQxKys7XHJcbiAgICAgICAgICBjb3VudDIgPSAwO1xyXG4gICAgICAgICAgaWYgKC0tbGVuZ3RoMSA9PT0gMCkge1xyXG4gICAgICAgICAgICBleGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhcnJheVtkZXN0LS1dID0gdG1wW2N1cnNvcjItLV07XHJcbiAgICAgICAgICBjb3VudDIrKztcclxuICAgICAgICAgIGNvdW50MSA9IDA7XHJcbiAgICAgICAgICBpZiAoLS1sZW5ndGgyID09PSAxKSB7XHJcbiAgICAgICAgICAgIGV4aXQgPSB0cnVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9IHdoaWxlICgoY291bnQxIHwgY291bnQyKSA8IG1pbkdhbGxvcCk7XHJcblxyXG4gICAgICBpZiAoZXhpdCkge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkbyB7XHJcbiAgICAgICAgY291bnQxID0gbGVuZ3RoMSAtIGdhbGxvcFJpZ2h0KHRtcFtjdXJzb3IyXSwgYXJyYXksIHN0YXJ0MSwgbGVuZ3RoMSwgbGVuZ3RoMSAtIDEsIGNvbXBhcmUpO1xyXG5cclxuICAgICAgICBpZiAoY291bnQxICE9PSAwKSB7XHJcbiAgICAgICAgICBkZXN0IC09IGNvdW50MTtcclxuICAgICAgICAgIGN1cnNvcjEgLT0gY291bnQxO1xyXG4gICAgICAgICAgbGVuZ3RoMSAtPSBjb3VudDE7XHJcbiAgICAgICAgICBjdXN0b21EZXN0ID0gZGVzdCArIDE7XHJcbiAgICAgICAgICBjdXN0b21DdXJzb3IgPSBjdXJzb3IxICsgMTtcclxuXHJcbiAgICAgICAgICBmb3IgKGkgPSBjb3VudDEgLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBhcnJheVtjdXN0b21EZXN0ICsgaV0gPSBhcnJheVtjdXN0b21DdXJzb3IgKyBpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAobGVuZ3RoMSA9PT0gMCkge1xyXG4gICAgICAgICAgICBleGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhcnJheVtkZXN0LS1dID0gdG1wW2N1cnNvcjItLV07XHJcblxyXG4gICAgICAgIGlmICgtLWxlbmd0aDIgPT09IDEpIHtcclxuICAgICAgICAgIGV4aXQgPSB0cnVlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb3VudDIgPSBsZW5ndGgyIC0gZ2FsbG9wTGVmdChhcnJheVtjdXJzb3IxXSwgdG1wLCAwLCBsZW5ndGgyLCBsZW5ndGgyIC0gMSwgY29tcGFyZSk7XHJcblxyXG4gICAgICAgIGlmIChjb3VudDIgIT09IDApIHtcclxuICAgICAgICAgIGRlc3QgLT0gY291bnQyO1xyXG4gICAgICAgICAgY3Vyc29yMiAtPSBjb3VudDI7XHJcbiAgICAgICAgICBsZW5ndGgyIC09IGNvdW50MjtcclxuICAgICAgICAgIGN1c3RvbURlc3QgPSBkZXN0ICsgMTtcclxuICAgICAgICAgIGN1c3RvbUN1cnNvciA9IGN1cnNvcjIgKyAxO1xyXG5cclxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudDI7IGkrKykge1xyXG4gICAgICAgICAgICBhcnJheVtjdXN0b21EZXN0ICsgaV0gPSB0bXBbY3VzdG9tQ3Vyc29yICsgaV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGxlbmd0aDIgPD0gMSkge1xyXG4gICAgICAgICAgICBleGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhcnJheVtkZXN0LS1dID0gYXJyYXlbY3Vyc29yMS0tXTtcclxuXHJcbiAgICAgICAgaWYgKC0tbGVuZ3RoMSA9PT0gMCkge1xyXG4gICAgICAgICAgZXhpdCA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1pbkdhbGxvcC0tO1xyXG5cclxuICAgICAgfSB3aGlsZSAoY291bnQxID49IERFRkFVTFRfTUlOX0dBTExPUElORyB8fCBjb3VudDIgPj0gREVGQVVMVF9NSU5fR0FMTE9QSU5HKTtcclxuXHJcbiAgICAgIGlmIChleGl0KSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChtaW5HYWxsb3AgPCAwKSB7XHJcbiAgICAgICAgbWluR2FsbG9wID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbWluR2FsbG9wICs9IDI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5taW5HYWxsb3AgPSBtaW5HYWxsb3A7XHJcblxyXG4gICAgaWYgKG1pbkdhbGxvcCA8IDEpIHtcclxuICAgICAgdGhpcy5taW5HYWxsb3AgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsZW5ndGgyID09PSAxKSB7XHJcbiAgICAgIGRlc3QgLT0gbGVuZ3RoMTtcclxuICAgICAgY3Vyc29yMSAtPSBsZW5ndGgxO1xyXG4gICAgICBjdXN0b21EZXN0ID0gZGVzdCArIDE7XHJcbiAgICAgIGN1c3RvbUN1cnNvciA9IGN1cnNvcjEgKyAxO1xyXG5cclxuICAgICAgZm9yIChpID0gbGVuZ3RoMSAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgYXJyYXlbY3VzdG9tRGVzdCArIGldID0gYXJyYXlbY3VzdG9tQ3Vyc29yICsgaV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFycmF5W2Rlc3RdID0gdG1wW2N1cnNvcjJdO1xyXG5cclxuICAgIH0gZWxzZSBpZiAobGVuZ3RoMiA9PT0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21lcmdlSGlnaCBwcmVjb25kaXRpb25zIHdlcmUgbm90IHJlc3BlY3RlZCcpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN1c3RvbUN1cnNvciA9IGRlc3QgLSAobGVuZ3RoMiAtIDEpO1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMjsgaSsrKSB7XHJcbiAgICAgICAgYXJyYXlbY3VzdG9tQ3Vyc29yICsgaV0gPSB0bXBbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTb3J0IGFuIGFycmF5IGluIHRoZSByYW5nZSBbbG8sIGhpKSB1c2luZyBUaW1Tb3J0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byBzb3J0LlxyXG4gKiBAcGFyYW0ge251bWJlcn0gbG8gLSBGaXJzdCBlbGVtZW50IGluIHRoZSByYW5nZSAoaW5jbHVzaXZlKS5cclxuICogQHBhcmFtIHtudW1iZXJ9IGhpIC0gTGFzdCBlbGVtZW50IGluIHRoZSByYW5nZS5cclxuICogQHBhcmFtIHtmdW5jdGlvbj19IGNvbXBhcmUgLSBJdGVtIGNvbXBhcmlzb24gZnVuY3Rpb24uIERlZmF1bHQgaXMgYWxwaGFiZXRpY2FsLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGFycmF5LCBsbywgaGksIGNvbXBhcmUpIHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW4gb25seSBzb3J0IGFycmF5cycpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgYSBjb21wYXJpc29uIGZ1bmN0aW9uIGlzIG5vdCBwcm92aWRlZC4gV2UgZG9cclxuICAgKiBsZXhpY29ncmFwaGljIHNvcnRpbmdcclxuICAgKi9cclxuXHJcbiAgaWYgKGxvID09PSB1bmRlZmluZWQpIHtcclxuICAgIGxvID0gMDtcclxuICB9XHJcblxyXG4gIGlmIChoaSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBoaSA9IGFycmF5Lmxlbmd0aDtcclxuICB9XHJcblxyXG4gIGlmIChjb21wYXJlID09PSB1bmRlZmluZWQpIHtcclxuICAgIGNvbXBhcmUgPSBhbHBoYWJldGljYWxDb21wYXJlO1xyXG4gIH1cclxuXHJcbiAgbGV0IHJlbWFpbmluZyA9IGhpIC0gbG87XHJcblxyXG4gIC8vIFRoZSBhcnJheSBpcyBhbHJlYWR5IHNvcnRlZFxyXG4gIGlmIChyZW1haW5pbmcgPCAyKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBsZXQgcnVuTGVuZ3RoID0gMDtcclxuICAvLyBPbiBzbWFsbCBhcnJheXMgYmluYXJ5IHNvcnQgY2FuIGJlIHVzZWQgZGlyZWN0bHlcclxuICBpZiAocmVtYWluaW5nIDwgREVGQVVMVF9NSU5fTUVSR0UpIHtcclxuICAgIHJ1bkxlbmd0aCA9IG1ha2VBc2NlbmRpbmdSdW4oYXJyYXksIGxvLCBoaSwgY29tcGFyZSk7XHJcbiAgICBiaW5hcnlJbnNlcnRpb25Tb3J0KGFycmF5LCBsbywgaGksIGxvICsgcnVuTGVuZ3RoLCBjb21wYXJlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGxldCB0cyA9IG5ldyBUaW1Tb3J0KGFycmF5LCBjb21wYXJlKTtcclxuXHJcbiAgbGV0IG1pblJ1biA9IG1pblJ1bkxlbmd0aChyZW1haW5pbmcpO1xyXG5cclxuICBkbyB7XHJcbiAgICBydW5MZW5ndGggPSBtYWtlQXNjZW5kaW5nUnVuKGFycmF5LCBsbywgaGksIGNvbXBhcmUpO1xyXG4gICAgaWYgKHJ1bkxlbmd0aCA8IG1pblJ1bikge1xyXG4gICAgICBsZXQgZm9yY2UgPSByZW1haW5pbmc7XHJcbiAgICAgIGlmIChmb3JjZSA+IG1pblJ1bikge1xyXG4gICAgICAgIGZvcmNlID0gbWluUnVuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBiaW5hcnlJbnNlcnRpb25Tb3J0KGFycmF5LCBsbywgbG8gKyBmb3JjZSwgbG8gKyBydW5MZW5ndGgsIGNvbXBhcmUpO1xyXG4gICAgICBydW5MZW5ndGggPSBmb3JjZTtcclxuICAgIH1cclxuICAgIC8vIFB1c2ggbmV3IHJ1biBhbmQgbWVyZ2UgaWYgbmVjZXNzYXJ5XHJcbiAgICB0cy5wdXNoUnVuKGxvLCBydW5MZW5ndGgpO1xyXG4gICAgdHMubWVyZ2VSdW5zKCk7XHJcblxyXG4gICAgLy8gR28gZmluZCBuZXh0IHJ1blxyXG4gICAgcmVtYWluaW5nIC09IHJ1bkxlbmd0aDtcclxuICAgIGxvICs9IHJ1bkxlbmd0aDtcclxuXHJcbiAgfSB3aGlsZSAocmVtYWluaW5nICE9PSAwKTtcclxuXHJcbiAgLy8gRm9yY2UgbWVyZ2luZyBvZiByZW1haW5pbmcgcnVuc1xyXG4gIHRzLmZvcmNlTWVyZ2VSdW5zKCk7XHJcbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==