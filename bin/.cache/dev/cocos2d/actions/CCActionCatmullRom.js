
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCActionCatmullRom.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2008 Radu Gruian
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011 Vit Valentin
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 Orignal code by Radu Gruian: http://www.codeproject.com/Articles/30838/Overhauser-Catmull-Rom-Splines-for-Camera-Animatio.So

 Adapted to cocos2d-x by Vit Valentin

 Adapted from cocos2d-x to cocos2d-iphone by Ricardo Quesada
 ****************************************************************************/

/**
 * @module cc
 */

/*
 * Returns the Cardinal Spline position for a given set of control points, tension and time. <br />
 * CatmullRom Spline formula. <br />
 * s(-ttt + 2tt - t)P1 + s(-ttt + tt)P2 + (2ttt - 3tt + 1)P2 + s(ttt - 2tt + t)P3 + (-2ttt + 3tt)P3 + s(ttt - tt)P4
 *
 * @method cardinalSplineAt
 * @param {Vec2} p0
 * @param {Vec2} p1
 * @param {Vec2} p2
 * @param {Vec2} p3
 * @param {Number} tension
 * @param {Number} t
 * @return {Vec2}
 */
function cardinalSplineAt(p0, p1, p2, p3, tension, t) {
  var t2 = t * t;
  var t3 = t2 * t;
  /*
   * Formula: s(-ttt + 2tt - t)P1 + s(-ttt + tt)P2 + (2ttt - 3tt + 1)P2 + s(ttt - 2tt + t)P3 + (-2ttt + 3tt)P3 + s(ttt - tt)P4
   */

  var s = (1 - tension) / 2;
  var b1 = s * (-t3 + 2 * t2 - t); // s(-t3 + 2 t2 - t)P1

  var b2 = s * (-t3 + t2) + (2 * t3 - 3 * t2 + 1); // s(-t3 + t2)P2 + (2 t3 - 3 t2 + 1)P2

  var b3 = s * (t3 - 2 * t2 + t) + (-2 * t3 + 3 * t2); // s(t3 - 2 t2 + t)P3 + (-2 t3 + 3 t2)P3

  var b4 = s * (t3 - t2); // s(t3 - t2)P4

  var x = p0.x * b1 + p1.x * b2 + p2.x * b3 + p3.x * b4;
  var y = p0.y * b1 + p1.y * b2 + p2.y * b3 + p3.y * b4;
  return cc.v2(x, y);
}

;
/*
 * returns a point from the array
 * @method getControlPointAt
 * @param {Array} controlPoints
 * @param {Number} pos
 * @return {Array}
 */

function getControlPointAt(controlPoints, pos) {
  var p = Math.min(controlPoints.length - 1, Math.max(pos, 0));
  return controlPoints[p];
}

;

function reverseControlPoints(controlPoints) {
  var newArray = [];

  for (var i = controlPoints.length - 1; i >= 0; i--) {
    newArray.push(cc.v2(controlPoints[i].x, controlPoints[i].y));
  }

  return newArray;
}

function cloneControlPoints(controlPoints) {
  var newArray = [];

  for (var i = 0; i < controlPoints.length; i++) {
    newArray.push(cc.v2(controlPoints[i].x, controlPoints[i].y));
  }

  return newArray;
}
/*
 * Cardinal Spline path. http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline
 * Absolute coordinates.
 *
 * @class CardinalSplineTo
 * @extends ActionInterval
 *
 * @param {Number} duration
 * @param {Array} points array of control points
 * @param {Number} tension
 *
 * @example
 * //create a cc.CardinalSplineTo
 * var action1 = cc.cardinalSplineTo(3, array, 0);
 */


cc.CardinalSplineTo = cc.Class({
  name: 'cc.CardinalSplineTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, points, tension) {
    /* Array of control points */
    this._points = [];
    this._deltaT = 0;
    this._tension = 0;
    this._previousPosition = null;
    this._accumulatedDiff = null;
    tension !== undefined && cc.CardinalSplineTo.prototype.initWithDuration.call(this, duration, points, tension);
  },
  initWithDuration: function initWithDuration(duration, points, tension) {
    if (!points || points.length === 0) {
      cc.errorID(1024);
      return false;
    }

    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this.setPoints(points);
      this._tension = tension;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.CardinalSplineTo();
    action.initWithDuration(this._duration, cloneControlPoints(this._points), this._tension);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target); // Issue #1441 from cocos2d-iphone

    this._deltaT = 1 / (this._points.length - 1);
    this._previousPosition = cc.v2(this.target.x, this.target.y);
    this._accumulatedDiff = cc.v2(0, 0);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    var p, lt;
    var ps = this._points; // eg.
    // p..p..p..p..p..p..p
    // 1..2..3..4..5..6..7
    // want p to be 1, 2, 3, 4, 5, 6

    if (dt === 1) {
      p = ps.length - 1;
      lt = 1;
    } else {
      var locDT = this._deltaT;
      p = 0 | dt / locDT;
      lt = (dt - locDT * p) / locDT;
    }

    var newPos = cardinalSplineAt(getControlPointAt(ps, p - 1), getControlPointAt(ps, p - 0), getControlPointAt(ps, p + 1), getControlPointAt(ps, p + 2), this._tension, lt);

    if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
      var tempX, tempY;
      tempX = this.target.x - this._previousPosition.x;
      tempY = this.target.y - this._previousPosition.y;

      if (tempX !== 0 || tempY !== 0) {
        var locAccDiff = this._accumulatedDiff;
        tempX = locAccDiff.x + tempX;
        tempY = locAccDiff.y + tempY;
        locAccDiff.x = tempX;
        locAccDiff.y = tempY;
        newPos.x += tempX;
        newPos.y += tempY;
      }
    }

    this.updatePosition(newPos);
  },
  reverse: function reverse() {
    var reversePoints = reverseControlPoints(this._points);
    return cc.cardinalSplineTo(this._duration, reversePoints, this._tension);
  },

  /*
   * update position of target
   * @method updatePosition
   * @param {Vec2} newPos
   */
  updatePosition: function updatePosition(newPos) {
    this.target.setPosition(newPos);
    this._previousPosition = newPos;
  },

  /*
   * Points getter
   * @method getPoints
   * @return {Array}
   */
  getPoints: function getPoints() {
    return this._points;
  },

  /**
   * Points setter
   * @method setPoints
   * @param {Array} points
   */
  setPoints: function setPoints(points) {
    this._points = points;
  }
});
/**
 * !#en Creates an action with a Cardinal Spline array of points and tension.
 * !#zh 按基数样条曲线轨迹移动到目标位置。
 * @method cardinalSplineTo
 * @param {Number} duration
 * @param {Array} points array of control points
 * @param {Number} tension
 * @return {ActionInterval}
 *
 * @example
 * //create a cc.CardinalSplineTo
 * var action1 = cc.cardinalSplineTo(3, array, 0);
 */

cc.cardinalSplineTo = function (duration, points, tension) {
  return new cc.CardinalSplineTo(duration, points, tension);
};
/*
 * Cardinal Spline path. http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline
 * Relative coordinates.
 *
 * @class CardinalSplineBy
 * @extends CardinalSplineTo
 *
 * @param {Number} duration
 * @param {Array} points
 * @param {Number} tension
 *
 * @example
 * //create a cc.CardinalSplineBy
 * var action1 = cc.cardinalSplineBy(3, array, 0);
 */


cc.CardinalSplineBy = cc.Class({
  name: 'cc.CardinalSplineBy',
  "extends": cc.CardinalSplineTo,
  ctor: function ctor(duration, points, tension) {
    this._startPosition = cc.v2(0, 0);
    tension !== undefined && this.initWithDuration(duration, points, tension);
  },
  startWithTarget: function startWithTarget(target) {
    cc.CardinalSplineTo.prototype.startWithTarget.call(this, target);
    this._startPosition.x = target.x;
    this._startPosition.y = target.y;
  },
  reverse: function reverse() {
    var copyConfig = this._points.slice();

    var current; //
    // convert "absolutes" to "diffs"
    //

    var p = copyConfig[0];

    for (var i = 1; i < copyConfig.length; ++i) {
      current = copyConfig[i];
      copyConfig[i] = current.sub(p);
      p = current;
    } // convert to "diffs" to "reverse absolute"


    var reverseArray = reverseControlPoints(copyConfig); // 1st element (which should be 0,0) should be here too

    p = reverseArray[reverseArray.length - 1];
    reverseArray.pop();
    p.x = -p.x;
    p.y = -p.y;
    reverseArray.unshift(p);

    for (var i = 1; i < reverseArray.length; ++i) {
      current = reverseArray[i];
      current.x = -current.x;
      current.y = -current.y;
      current.x += p.x;
      current.y += p.y;
      reverseArray[i] = current;
      p = current;
    }

    return cc.cardinalSplineBy(this._duration, reverseArray, this._tension);
  },

  /**
   * update position of target
   * @method updatePosition
   * @param {Vec2} newPos
   */
  updatePosition: function updatePosition(newPos) {
    var pos = this._startPosition;
    var posX = newPos.x + pos.x;
    var posY = newPos.y + pos.y;
    this._previousPosition.x = posX;
    this._previousPosition.y = posY;
    this.target.setPosition(posX, posY);
  },
  clone: function clone() {
    var a = new cc.CardinalSplineBy();
    a.initWithDuration(this._duration, cloneControlPoints(this._points), this._tension);
    return a;
  }
});
/**
 * !#en Creates an action with a Cardinal Spline array of points and tension.
 * !#zh 按基数样条曲线轨迹移动指定的距离。
 * @method cardinalSplineBy
 * @param {Number} duration
 * @param {Array} points
 * @param {Number} tension
 *
 * @return {ActionInterval}
 */

cc.cardinalSplineBy = function (duration, points, tension) {
  return new cc.CardinalSplineBy(duration, points, tension);
};
/*
 * An action that moves the target with a CatmullRom curve to a destination point.<br/>
 * A Catmull Rom is a Cardinal Spline with a tension of 0.5.  <br/>
 * http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline
 * Absolute coordinates.
 *
 * @class CatmullRomTo
 * @extends CardinalSplineTo
 *
 * @param {Number} dt
 * @param {Array} points
 *
 * @example
 * var action1 = cc.catmullRomTo(3, array);
 */


cc.CatmullRomTo = cc.Class({
  name: 'cc.CatmullRomTo',
  "extends": cc.CardinalSplineTo,
  ctor: function ctor(dt, points) {
    points && this.initWithDuration(dt, points);
  },
  initWithDuration: function initWithDuration(dt, points) {
    return cc.CardinalSplineTo.prototype.initWithDuration.call(this, dt, points, 0.5);
  },
  clone: function clone() {
    var action = new cc.CatmullRomTo();
    action.initWithDuration(this._duration, cloneControlPoints(this._points));
    return action;
  }
});
/**
 * !#en Creates an action with a Cardinal Spline array of points and tension.
 * !#zh 按 Catmull Rom 样条曲线轨迹移动到目标位置。
 * @method catmullRomTo
 * @param {Number} dt
 * @param {Array} points
 * @return {ActionInterval}
 *
 * @example
 * var action1 = cc.catmullRomTo(3, array);
 */

cc.catmullRomTo = function (dt, points) {
  return new cc.CatmullRomTo(dt, points);
};
/*
 * An action that moves the target with a CatmullRom curve by a certain distance.  <br/>
 * A Catmull Rom is a Cardinal Spline with a tension of 0.5.<br/>
 * http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline
 * Relative coordinates.
 *
 * @class CatmullRomBy
 * @extends CardinalSplineBy
 *
 * @param {Number} dt
 * @param {Array} points
 *
 * @example
 * var action1 = cc.catmullRomBy(3, array);
 */


cc.CatmullRomBy = cc.Class({
  name: 'cc.CatmullRomBy',
  "extends": cc.CardinalSplineBy,
  ctor: function ctor(dt, points) {
    points && this.initWithDuration(dt, points);
  },
  initWithDuration: function initWithDuration(dt, points) {
    return cc.CardinalSplineTo.prototype.initWithDuration.call(this, dt, points, 0.5);
  },
  clone: function clone() {
    var action = new cc.CatmullRomBy();
    action.initWithDuration(this._duration, cloneControlPoints(this._points));
    return action;
  }
});
/**
 * !#en Creates an action with a Cardinal Spline array of points and tension.
 * !#zh 按 Catmull Rom 样条曲线轨迹移动指定的距离。
 * @method catmullRomBy
 * @param {Number} dt
 * @param {Array} points
 * @return {ActionInterval}
 * @example
 * var action1 = cc.catmullRomBy(3, array);
 */

cc.catmullRomBy = function (dt, points) {
  return new cc.CatmullRomBy(dt, points);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFjdGlvbnNcXENDQWN0aW9uQ2F0bXVsbFJvbS5qcyJdLCJuYW1lcyI6WyJjYXJkaW5hbFNwbGluZUF0IiwicDAiLCJwMSIsInAyIiwicDMiLCJ0ZW5zaW9uIiwidCIsInQyIiwidDMiLCJzIiwiYjEiLCJiMiIsImIzIiwiYjQiLCJ4IiwieSIsImNjIiwidjIiLCJnZXRDb250cm9sUG9pbnRBdCIsImNvbnRyb2xQb2ludHMiLCJwb3MiLCJwIiwiTWF0aCIsIm1pbiIsImxlbmd0aCIsIm1heCIsInJldmVyc2VDb250cm9sUG9pbnRzIiwibmV3QXJyYXkiLCJpIiwicHVzaCIsImNsb25lQ29udHJvbFBvaW50cyIsIkNhcmRpbmFsU3BsaW5lVG8iLCJDbGFzcyIsIm5hbWUiLCJBY3Rpb25JbnRlcnZhbCIsImN0b3IiLCJkdXJhdGlvbiIsInBvaW50cyIsIl9wb2ludHMiLCJfZGVsdGFUIiwiX3RlbnNpb24iLCJfcHJldmlvdXNQb3NpdGlvbiIsIl9hY2N1bXVsYXRlZERpZmYiLCJ1bmRlZmluZWQiLCJwcm90b3R5cGUiLCJpbml0V2l0aER1cmF0aW9uIiwiY2FsbCIsImVycm9ySUQiLCJzZXRQb2ludHMiLCJjbG9uZSIsImFjdGlvbiIsIl9kdXJhdGlvbiIsInN0YXJ0V2l0aFRhcmdldCIsInRhcmdldCIsInVwZGF0ZSIsImR0IiwiX2NvbXB1dGVFYXNlVGltZSIsImx0IiwicHMiLCJsb2NEVCIsIm5ld1BvcyIsIm1hY3JvIiwiRU5BQkxFX1NUQUNLQUJMRV9BQ1RJT05TIiwidGVtcFgiLCJ0ZW1wWSIsImxvY0FjY0RpZmYiLCJ1cGRhdGVQb3NpdGlvbiIsInJldmVyc2UiLCJyZXZlcnNlUG9pbnRzIiwiY2FyZGluYWxTcGxpbmVUbyIsInNldFBvc2l0aW9uIiwiZ2V0UG9pbnRzIiwiQ2FyZGluYWxTcGxpbmVCeSIsIl9zdGFydFBvc2l0aW9uIiwiY29weUNvbmZpZyIsInNsaWNlIiwiY3VycmVudCIsInN1YiIsInJldmVyc2VBcnJheSIsInBvcCIsInVuc2hpZnQiLCJjYXJkaW5hbFNwbGluZUJ5IiwicG9zWCIsInBvc1kiLCJhIiwiQ2F0bXVsbFJvbVRvIiwiY2F0bXVsbFJvbVRvIiwiQ2F0bXVsbFJvbUJ5IiwiY2F0bXVsbFJvbUJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQSxnQkFBVCxDQUEyQkMsRUFBM0IsRUFBK0JDLEVBQS9CLEVBQW1DQyxFQUFuQyxFQUF1Q0MsRUFBdkMsRUFBMkNDLE9BQTNDLEVBQW9EQyxDQUFwRCxFQUF1RDtBQUNuRCxNQUFJQyxFQUFFLEdBQUdELENBQUMsR0FBR0EsQ0FBYjtBQUNBLE1BQUlFLEVBQUUsR0FBR0QsRUFBRSxHQUFHRCxDQUFkO0FBRUE7QUFDSjtBQUNBOztBQUNJLE1BQUlHLENBQUMsR0FBRyxDQUFDLElBQUlKLE9BQUwsSUFBZ0IsQ0FBeEI7QUFFQSxNQUFJSyxFQUFFLEdBQUdELENBQUMsSUFBSyxDQUFDRCxFQUFELEdBQU8sSUFBSUQsRUFBWixHQUFtQkQsQ0FBdkIsQ0FBVixDQVRtRCxDQVNPOztBQUMxRCxNQUFJSyxFQUFFLEdBQUdGLENBQUMsSUFBSSxDQUFDRCxFQUFELEdBQU1ELEVBQVYsQ0FBRCxJQUFrQixJQUFJQyxFQUFKLEdBQVMsSUFBSUQsRUFBYixHQUFrQixDQUFwQyxDQUFULENBVm1ELENBVU87O0FBQzFELE1BQUlLLEVBQUUsR0FBR0gsQ0FBQyxJQUFJRCxFQUFFLEdB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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMDggUmFkdSBHcnVpYW5cclxuIENvcHlyaWdodCAoYykgMjAwOC0yMDEwIFJpY2FyZG8gUXVlc2FkYVxyXG4gQ29weXJpZ2h0IChjKSAyMDExIFZpdCBWYWxlbnRpblxyXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXHJcbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuXHJcbiBPcmlnbmFsIGNvZGUgYnkgUmFkdSBHcnVpYW46IGh0dHA6Ly93d3cuY29kZXByb2plY3QuY29tL0FydGljbGVzLzMwODM4L092ZXJoYXVzZXItQ2F0bXVsbC1Sb20tU3BsaW5lcy1mb3ItQ2FtZXJhLUFuaW1hdGlvLlNvXHJcblxyXG4gQWRhcHRlZCB0byBjb2NvczJkLXggYnkgVml0IFZhbGVudGluXHJcblxyXG4gQWRhcHRlZCBmcm9tIGNvY29zMmQteCB0byBjb2NvczJkLWlwaG9uZSBieSBSaWNhcmRvIFF1ZXNhZGFcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuXHJcbi8qXHJcbiAqIFJldHVybnMgdGhlIENhcmRpbmFsIFNwbGluZSBwb3NpdGlvbiBmb3IgYSBnaXZlbiBzZXQgb2YgY29udHJvbCBwb2ludHMsIHRlbnNpb24gYW5kIHRpbWUuIDxiciAvPlxyXG4gKiBDYXRtdWxsUm9tIFNwbGluZSBmb3JtdWxhLiA8YnIgLz5cclxuICogcygtdHR0ICsgMnR0IC0gdClQMSArIHMoLXR0dCArIHR0KVAyICsgKDJ0dHQgLSAzdHQgKyAxKVAyICsgcyh0dHQgLSAydHQgKyB0KVAzICsgKC0ydHR0ICsgM3R0KVAzICsgcyh0dHQgLSB0dClQNFxyXG4gKlxyXG4gKiBAbWV0aG9kIGNhcmRpbmFsU3BsaW5lQXRcclxuICogQHBhcmFtIHtWZWMyfSBwMFxyXG4gKiBAcGFyYW0ge1ZlYzJ9IHAxXHJcbiAqIEBwYXJhbSB7VmVjMn0gcDJcclxuICogQHBhcmFtIHtWZWMyfSBwM1xyXG4gKiBAcGFyYW0ge051bWJlcn0gdGVuc2lvblxyXG4gKiBAcGFyYW0ge051bWJlcn0gdFxyXG4gKiBAcmV0dXJuIHtWZWMyfVxyXG4gKi9cclxuZnVuY3Rpb24gY2FyZGluYWxTcGxpbmVBdCAocDAsIHAxLCBwMiwgcDMsIHRlbnNpb24sIHQpIHtcclxuICAgIHZhciB0MiA9IHQgKiB0O1xyXG4gICAgdmFyIHQzID0gdDIgKiB0O1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiBGb3JtdWxhOiBzKC10dHQgKyAydHQgLSB0KVAxICsgcygtdHR0ICsgdHQpUDIgKyAoMnR0dCAtIDN0dCArIDEpUDIgKyBzKHR0dCAtIDJ0dCArIHQpUDMgKyAoLTJ0dHQgKyAzdHQpUDMgKyBzKHR0dCAtIHR0KVA0XHJcbiAgICAgKi9cclxuICAgIHZhciBzID0gKDEgLSB0ZW5zaW9uKSAvIDI7XHJcblxyXG4gICAgdmFyIGIxID0gcyAqICgoLXQzICsgKDIgKiB0MikpIC0gdCk7ICAgICAgICAgICAgICAgICAgICAgIC8vIHMoLXQzICsgMiB0MiAtIHQpUDFcclxuICAgIHZhciBiMiA9IHMgKiAoLXQzICsgdDIpICsgKDIgKiB0MyAtIDMgKiB0MiArIDEpOyAgICAgICAgICAvLyBzKC10MyArIHQyKVAyICsgKDIgdDMgLSAzIHQyICsgMSlQMlxyXG4gICAgdmFyIGIzID0gcyAqICh0MyAtIDIgKiB0MiArIHQpICsgKC0yICogdDMgKyAzICogdDIpOyAgICAgIC8vIHModDMgLSAyIHQyICsgdClQMyArICgtMiB0MyArIDMgdDIpUDNcclxuICAgIHZhciBiNCA9IHMgKiAodDMgLSB0Mik7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzKHQzIC0gdDIpUDRcclxuXHJcbiAgICB2YXIgeCA9IChwMC54ICogYjEgKyBwMS54ICogYjIgKyBwMi54ICogYjMgKyBwMy54ICogYjQpO1xyXG4gICAgdmFyIHkgPSAocDAueSAqIGIxICsgcDEueSAqIGIyICsgcDIueSAqIGIzICsgcDMueSAqIGI0KTtcclxuICAgIHJldHVybiBjYy52Mih4LCB5KTtcclxufTtcclxuXHJcbi8qXHJcbiAqIHJldHVybnMgYSBwb2ludCBmcm9tIHRoZSBhcnJheVxyXG4gKiBAbWV0aG9kIGdldENvbnRyb2xQb2ludEF0XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGNvbnRyb2xQb2ludHNcclxuICogQHBhcmFtIHtOdW1iZXJ9IHBvc1xyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbnRyb2xQb2ludEF0IChjb250cm9sUG9pbnRzLCBwb3MpIHtcclxuICAgIHZhciBwID0gTWF0aC5taW4oY29udHJvbFBvaW50cy5sZW5ndGggLSAxLCBNYXRoLm1heChwb3MsIDApKTtcclxuICAgIHJldHVybiBjb250cm9sUG9pbnRzW3BdO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gcmV2ZXJzZUNvbnRyb2xQb2ludHMgKGNvbnRyb2xQb2ludHMpIHtcclxuICAgIHZhciBuZXdBcnJheSA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IGNvbnRyb2xQb2ludHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBuZXdBcnJheS5wdXNoKGNjLnYyKGNvbnRyb2xQb2ludHNbaV0ueCwgY29udHJvbFBvaW50c1tpXS55KSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3QXJyYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb25lQ29udHJvbFBvaW50cyAoY29udHJvbFBvaW50cykge1xyXG4gICAgdmFyIG5ld0FycmF5ID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRyb2xQb2ludHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgbmV3QXJyYXkucHVzaChjYy52Mihjb250cm9sUG9pbnRzW2ldLngsIGNvbnRyb2xQb2ludHNbaV0ueSkpO1xyXG4gICAgcmV0dXJuIG5ld0FycmF5O1xyXG59XHJcblxyXG5cclxuLypcclxuICogQ2FyZGluYWwgU3BsaW5lIHBhdGguIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ3ViaWNfSGVybWl0ZV9zcGxpbmUjQ2FyZGluYWxfc3BsaW5lXHJcbiAqIEFic29sdXRlIGNvb3JkaW5hdGVzLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ2FyZGluYWxTcGxpbmVUb1xyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cclxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzIGFycmF5IG9mIGNvbnRyb2wgcG9pbnRzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0ZW5zaW9uXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vY3JlYXRlIGEgY2MuQ2FyZGluYWxTcGxpbmVUb1xyXG4gKiB2YXIgYWN0aW9uMSA9IGNjLmNhcmRpbmFsU3BsaW5lVG8oMywgYXJyYXksIDApO1xyXG4gKi9cclxuY2MuQ2FyZGluYWxTcGxpbmVUbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5DYXJkaW5hbFNwbGluZVRvJyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uIChkdXJhdGlvbiwgcG9pbnRzLCB0ZW5zaW9uKSB7XHJcbiAgICAgICAgLyogQXJyYXkgb2YgY29udHJvbCBwb2ludHMgKi9cclxuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcclxuICAgICAgICB0aGlzLl9kZWx0YVQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RlbnNpb24gPSAwO1xyXG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUG9zaXRpb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2FjY3VtdWxhdGVkRGlmZiA9IG51bGw7XHJcbiAgICAgICAgdGVuc2lvbiAhPT0gdW5kZWZpbmVkICYmIGNjLkNhcmRpbmFsU3BsaW5lVG8ucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbiwgcG9pbnRzLCB0ZW5zaW9uKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24sIHBvaW50cywgdGVuc2lvbikge1xyXG4gICAgICAgIGlmICghcG9pbnRzIHx8IHBvaW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgY2MuZXJyb3JJRCgxMDI0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UG9pbnRzKHBvaW50cyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RlbnNpb24gPSB0ZW5zaW9uO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5DYXJkaW5hbFNwbGluZVRvKCk7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIGNsb25lQ29udHJvbFBvaW50cyh0aGlzLl9wb2ludHMpLCB0aGlzLl90ZW5zaW9uKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIC8vIElzc3VlICMxNDQxIGZyb20gY29jb3MyZC1pcGhvbmVcclxuICAgICAgICB0aGlzLl9kZWx0YVQgPSAxIC8gKHRoaXMuX3BvaW50cy5sZW5ndGggLSAxKTtcclxuICAgICAgICB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uID0gY2MudjIodGhpcy50YXJnZXQueCwgdGhpcy50YXJnZXQueSk7XHJcbiAgICAgICAgdGhpcy5fYWNjdW11bGF0ZWREaWZmID0gY2MudjIoMCwgMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XHJcbiAgICAgICAgdmFyIHAsIGx0O1xyXG4gICAgICAgIHZhciBwcyA9IHRoaXMuX3BvaW50cztcclxuICAgICAgICAvLyBlZy5cclxuICAgICAgICAvLyBwLi5wLi5wLi5wLi5wLi5wLi5wXHJcbiAgICAgICAgLy8gMS4uMi4uMy4uNC4uNS4uNi4uN1xyXG4gICAgICAgIC8vIHdhbnQgcCB0byBiZSAxLCAyLCAzLCA0LCA1LCA2XHJcbiAgICAgICAgaWYgKGR0ID09PSAxKSB7XHJcbiAgICAgICAgICAgIHAgPSBwcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBsdCA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGxvY0RUID0gdGhpcy5fZGVsdGFUO1xyXG4gICAgICAgICAgICBwID0gMCB8IChkdCAvIGxvY0RUKTtcclxuICAgICAgICAgICAgbHQgPSAoZHQgLSBsb2NEVCAqIHApIC8gbG9jRFQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbmV3UG9zID0gY2FyZGluYWxTcGxpbmVBdChcclxuICAgICAgICAgICAgZ2V0Q29udHJvbFBvaW50QXQocHMsIHAgLSAxKSxcclxuICAgICAgICAgICAgZ2V0Q29udHJvbFBvaW50QXQocHMsIHAgLSAwKSxcclxuICAgICAgICAgICAgZ2V0Q29udHJvbFBvaW50QXQocHMsIHAgKyAxKSxcclxuICAgICAgICAgICAgZ2V0Q29udHJvbFBvaW50QXQocHMsIHAgKyAyKSxcclxuICAgICAgICAgICAgdGhpcy5fdGVuc2lvbiwgbHQpO1xyXG5cclxuICAgICAgICBpZiAoY2MubWFjcm8uRU5BQkxFX1NUQUNLQUJMRV9BQ1RJT05TKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wWCwgdGVtcFk7XHJcbiAgICAgICAgICAgIHRlbXBYID0gdGhpcy50YXJnZXQueCAtIHRoaXMuX3ByZXZpb3VzUG9zaXRpb24ueDtcclxuICAgICAgICAgICAgdGVtcFkgPSB0aGlzLnRhcmdldC55IC0gdGhpcy5fcHJldmlvdXNQb3NpdGlvbi55O1xyXG4gICAgICAgICAgICBpZiAodGVtcFggIT09IDAgfHwgdGVtcFkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBsb2NBY2NEaWZmID0gdGhpcy5fYWNjdW11bGF0ZWREaWZmO1xyXG4gICAgICAgICAgICAgICAgdGVtcFggPSBsb2NBY2NEaWZmLnggKyB0ZW1wWDtcclxuICAgICAgICAgICAgICAgIHRlbXBZID0gbG9jQWNjRGlmZi55ICsgdGVtcFk7XHJcbiAgICAgICAgICAgICAgICBsb2NBY2NEaWZmLnggPSB0ZW1wWDtcclxuICAgICAgICAgICAgICAgIGxvY0FjY0RpZmYueSA9IHRlbXBZO1xyXG4gICAgICAgICAgICAgICAgbmV3UG9zLnggKz0gdGVtcFg7XHJcbiAgICAgICAgICAgICAgICBuZXdQb3MueSArPSB0ZW1wWTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKG5ld1Bvcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZXZlcnNlUG9pbnRzID0gcmV2ZXJzZUNvbnRyb2xQb2ludHModGhpcy5fcG9pbnRzKTtcclxuICAgICAgICByZXR1cm4gY2MuY2FyZGluYWxTcGxpbmVUbyh0aGlzLl9kdXJhdGlvbiwgcmV2ZXJzZVBvaW50cywgdGhpcy5fdGVuc2lvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiB1cGRhdGUgcG9zaXRpb24gb2YgdGFyZ2V0XHJcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG5ld1Bvc1xyXG4gICAgICovXHJcbiAgICB1cGRhdGVQb3NpdGlvbjpmdW5jdGlvbiAobmV3UG9zKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQuc2V0UG9zaXRpb24obmV3UG9zKTtcclxuICAgICAgICB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uID0gbmV3UG9zO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogUG9pbnRzIGdldHRlclxyXG4gICAgICogQG1ldGhvZCBnZXRQb2ludHNcclxuICAgICAqIEByZXR1cm4ge0FycmF5fVxyXG4gICAgICovXHJcbiAgICBnZXRQb2ludHM6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9pbnRzIHNldHRlclxyXG4gICAgICogQG1ldGhvZCBzZXRQb2ludHNcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBvaW50c1xyXG4gICAgICovXHJcbiAgICBzZXRQb2ludHM6ZnVuY3Rpb24gKHBvaW50cykge1xyXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHBvaW50cztcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBDcmVhdGVzIGFuIGFjdGlvbiB3aXRoIGEgQ2FyZGluYWwgU3BsaW5lIGFycmF5IG9mIHBvaW50cyBhbmQgdGVuc2lvbi5cclxuICogISN6aCDmjInln7rmlbDmoLfmnaHmm7Lnur/ovajov7nnp7vliqjliLDnm67moIfkvY3nva7jgIJcclxuICogQG1ldGhvZCBjYXJkaW5hbFNwbGluZVRvXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludHMgYXJyYXkgb2YgY29udHJvbCBwb2ludHNcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRlbnNpb25cclxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vY3JlYXRlIGEgY2MuQ2FyZGluYWxTcGxpbmVUb1xyXG4gKiB2YXIgYWN0aW9uMSA9IGNjLmNhcmRpbmFsU3BsaW5lVG8oMywgYXJyYXksIDApO1xyXG4gKi9cclxuY2MuY2FyZGluYWxTcGxpbmVUbyA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgcG9pbnRzLCB0ZW5zaW9uKSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLkNhcmRpbmFsU3BsaW5lVG8oZHVyYXRpb24sIHBvaW50cywgdGVuc2lvbik7XHJcbn07XHJcblxyXG4vKlxyXG4gKiBDYXJkaW5hbCBTcGxpbmUgcGF0aC4gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DdWJpY19IZXJtaXRlX3NwbGluZSNDYXJkaW5hbF9zcGxpbmVcclxuICogUmVsYXRpdmUgY29vcmRpbmF0ZXMuXHJcbiAqXHJcbiAqIEBjbGFzcyBDYXJkaW5hbFNwbGluZUJ5XHJcbiAqIEBleHRlbmRzIENhcmRpbmFsU3BsaW5lVG9cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50c1xyXG4gKiBAcGFyYW0ge051bWJlcn0gdGVuc2lvblxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvL2NyZWF0ZSBhIGNjLkNhcmRpbmFsU3BsaW5lQnlcclxuICogdmFyIGFjdGlvbjEgPSBjYy5jYXJkaW5hbFNwbGluZUJ5KDMsIGFycmF5LCAwKTtcclxuICovXHJcbmNjLkNhcmRpbmFsU3BsaW5lQnkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuQ2FyZGluYWxTcGxpbmVCeScsXHJcbiAgICBleHRlbmRzOiBjYy5DYXJkaW5hbFNwbGluZVRvLFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uLCBwb2ludHMsIHRlbnNpb24pIHtcclxuICAgICAgICB0aGlzLl9zdGFydFBvc2l0aW9uID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgdGVuc2lvbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkdXJhdGlvbiwgcG9pbnRzLCB0ZW5zaW9uKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBjYy5DYXJkaW5hbFNwbGluZVRvLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0UG9zaXRpb24ueCA9IHRhcmdldC54O1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0UG9zaXRpb24ueSA9IHRhcmdldC55O1xyXG4gICAgfSxcclxuXHJcbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29weUNvbmZpZyA9IHRoaXMuX3BvaW50cy5zbGljZSgpO1xyXG4gICAgICAgIHZhciBjdXJyZW50O1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gY29udmVydCBcImFic29sdXRlc1wiIHRvIFwiZGlmZnNcIlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdmFyIHAgPSBjb3B5Q29uZmlnWzBdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgY29weUNvbmZpZy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY29weUNvbmZpZ1tpXTtcclxuICAgICAgICAgICAgY29weUNvbmZpZ1tpXSA9IGN1cnJlbnQuc3ViKHApO1xyXG4gICAgICAgICAgICBwID0gY3VycmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnZlcnQgdG8gXCJkaWZmc1wiIHRvIFwicmV2ZXJzZSBhYnNvbHV0ZVwiXHJcbiAgICAgICAgdmFyIHJldmVyc2VBcnJheSA9IHJldmVyc2VDb250cm9sUG9pbnRzKGNvcHlDb25maWcpO1xyXG5cclxuICAgICAgICAvLyAxc3QgZWxlbWVudCAod2hpY2ggc2hvdWxkIGJlIDAsMCkgc2hvdWxkIGJlIGhlcmUgdG9vXHJcbiAgICAgICAgcCA9IHJldmVyc2VBcnJheVsgcmV2ZXJzZUFycmF5Lmxlbmd0aCAtIDEgXTtcclxuICAgICAgICByZXZlcnNlQXJyYXkucG9wKCk7XHJcblxyXG4gICAgICAgIHAueCA9IC1wLng7XHJcbiAgICAgICAgcC55ID0gLXAueTtcclxuXHJcbiAgICAgICAgcmV2ZXJzZUFycmF5LnVuc2hpZnQocCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCByZXZlcnNlQXJyYXkubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IHJldmVyc2VBcnJheVtpXTtcclxuICAgICAgICAgICAgY3VycmVudC54ID0gLWN1cnJlbnQueDtcclxuICAgICAgICAgICAgY3VycmVudC55ID0gLWN1cnJlbnQueTtcclxuICAgICAgICAgICAgY3VycmVudC54ICs9IHAueDtcclxuICAgICAgICAgICAgY3VycmVudC55ICs9IHAueTtcclxuICAgICAgICAgICAgcmV2ZXJzZUFycmF5W2ldID0gY3VycmVudDtcclxuICAgICAgICAgICAgcCA9IGN1cnJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5jYXJkaW5hbFNwbGluZUJ5KHRoaXMuX2R1cmF0aW9uLCByZXZlcnNlQXJyYXksIHRoaXMuX3RlbnNpb24pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZSBwb3NpdGlvbiBvZiB0YXJnZXRcclxuICAgICAqIEBtZXRob2QgdXBkYXRlUG9zaXRpb25cclxuICAgICAqIEBwYXJhbSB7VmVjMn0gbmV3UG9zXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVBvc2l0aW9uOmZ1bmN0aW9uIChuZXdQb3MpIHtcclxuICAgICAgICB2YXIgcG9zID0gdGhpcy5fc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICB2YXIgcG9zWCA9IG5ld1Bvcy54ICsgcG9zLng7XHJcbiAgICAgICAgdmFyIHBvc1kgPSBuZXdQb3MueSArIHBvcy55O1xyXG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUG9zaXRpb24ueCA9IHBvc1g7XHJcbiAgICAgICAgdGhpcy5fcHJldmlvdXNQb3NpdGlvbi55ID0gcG9zWTtcclxuICAgICAgICB0aGlzLnRhcmdldC5zZXRQb3NpdGlvbihwb3NYLCBwb3NZKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhID0gbmV3IGNjLkNhcmRpbmFsU3BsaW5lQnkoKTtcclxuICAgICAgICBhLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIGNsb25lQ29udHJvbFBvaW50cyh0aGlzLl9wb2ludHMpLCB0aGlzLl90ZW5zaW9uKTtcclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBDcmVhdGVzIGFuIGFjdGlvbiB3aXRoIGEgQ2FyZGluYWwgU3BsaW5lIGFycmF5IG9mIHBvaW50cyBhbmQgdGVuc2lvbi5cclxuICogISN6aCDmjInln7rmlbDmoLfmnaHmm7Lnur/ovajov7nnp7vliqjmjIflrprnmoTot53nprvjgIJcclxuICogQG1ldGhvZCBjYXJkaW5hbFNwbGluZUJ5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludHNcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRlbnNpb25cclxuICpcclxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XHJcbiAqL1xyXG5jYy5jYXJkaW5hbFNwbGluZUJ5ID0gZnVuY3Rpb24gKGR1cmF0aW9uLCBwb2ludHMsIHRlbnNpb24pIHtcclxuICAgIHJldHVybiBuZXcgY2MuQ2FyZGluYWxTcGxpbmVCeShkdXJhdGlvbiwgcG9pbnRzLCB0ZW5zaW9uKTtcclxufTtcclxuXHJcbi8qXHJcbiAqIEFuIGFjdGlvbiB0aGF0IG1vdmVzIHRoZSB0YXJnZXQgd2l0aCBhIENhdG11bGxSb20gY3VydmUgdG8gYSBkZXN0aW5hdGlvbiBwb2ludC48YnIvPlxyXG4gKiBBIENhdG11bGwgUm9tIGlzIGEgQ2FyZGluYWwgU3BsaW5lIHdpdGggYSB0ZW5zaW9uIG9mIDAuNS4gIDxici8+XHJcbiAqIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ3ViaWNfSGVybWl0ZV9zcGxpbmUjQ2F0bXVsbC5FMi44MC45M1JvbV9zcGxpbmVcclxuICogQWJzb2x1dGUgY29vcmRpbmF0ZXMuXHJcbiAqXHJcbiAqIEBjbGFzcyBDYXRtdWxsUm9tVG9cclxuICogQGV4dGVuZHMgQ2FyZGluYWxTcGxpbmVUb1xyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gZHRcclxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb24xID0gY2MuY2F0bXVsbFJvbVRvKDMsIGFycmF5KTtcclxuICovXHJcbmNjLkNhdG11bGxSb21UbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5DYXRtdWxsUm9tVG8nLFxyXG4gICAgZXh0ZW5kczogY2MuQ2FyZGluYWxTcGxpbmVUbyxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbihkdCwgcG9pbnRzKSB7XHJcbiAgICAgICAgcG9pbnRzICYmIHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkdCwgcG9pbnRzKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHQsIHBvaW50cykge1xyXG4gICAgICAgIHJldHVybiBjYy5DYXJkaW5hbFNwbGluZVRvLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHQsIHBvaW50cywgMC41KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuQ2F0bXVsbFJvbVRvKCk7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIGNsb25lQ29udHJvbFBvaW50cyh0aGlzLl9wb2ludHMpKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIENyZWF0ZXMgYW4gYWN0aW9uIHdpdGggYSBDYXJkaW5hbCBTcGxpbmUgYXJyYXkgb2YgcG9pbnRzIGFuZCB0ZW5zaW9uLlxyXG4gKiAhI3poIOaMiSBDYXRtdWxsIFJvbSDmoLfmnaHmm7Lnur/ovajov7nnp7vliqjliLDnm67moIfkvY3nva7jgIJcclxuICogQG1ldGhvZCBjYXRtdWxsUm9tVG9cclxuICogQHBhcmFtIHtOdW1iZXJ9IGR0XHJcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50c1xyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIGFjdGlvbjEgPSBjYy5jYXRtdWxsUm9tVG8oMywgYXJyYXkpO1xyXG4gKi9cclxuY2MuY2F0bXVsbFJvbVRvID0gZnVuY3Rpb24gKGR0LCBwb2ludHMpIHtcclxuICAgIHJldHVybiBuZXcgY2MuQ2F0bXVsbFJvbVRvKGR0LCBwb2ludHMpO1xyXG59O1xyXG5cclxuLypcclxuICogQW4gYWN0aW9uIHRoYXQgbW92ZXMgdGhlIHRhcmdldCB3aXRoIGEgQ2F0bXVsbFJvbSBjdXJ2ZSBieSBhIGNlcnRhaW4gZGlzdGFuY2UuICA8YnIvPlxyXG4gKiBBIENhdG11bGwgUm9tIGlzIGEgQ2FyZGluYWwgU3BsaW5lIHdpdGggYSB0ZW5zaW9uIG9mIDAuNS48YnIvPlxyXG4gKiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0N1YmljX0hlcm1pdGVfc3BsaW5lI0NhdG11bGwuRTIuODAuOTNSb21fc3BsaW5lXHJcbiAqIFJlbGF0aXZlIGNvb3JkaW5hdGVzLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ2F0bXVsbFJvbUJ5XHJcbiAqIEBleHRlbmRzIENhcmRpbmFsU3BsaW5lQnlcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR0XHJcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50c1xyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgYWN0aW9uMSA9IGNjLmNhdG11bGxSb21CeSgzLCBhcnJheSk7XHJcbiAqL1xyXG5jYy5DYXRtdWxsUm9tQnkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuQ2F0bXVsbFJvbUJ5JyxcclxuICAgIGV4dGVuZHM6IGNjLkNhcmRpbmFsU3BsaW5lQnksXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24oZHQsIHBvaW50cykge1xyXG4gICAgICAgIHBvaW50cyAmJiB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHQsIHBvaW50cyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKGR0LCBwb2ludHMpIHtcclxuICAgICAgICByZXR1cm4gY2MuQ2FyZGluYWxTcGxpbmVUby5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR0LCBwb2ludHMsIDAuNSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkNhdG11bGxSb21CeSgpO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCBjbG9uZUNvbnRyb2xQb2ludHModGhpcy5fcG9pbnRzKSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBDcmVhdGVzIGFuIGFjdGlvbiB3aXRoIGEgQ2FyZGluYWwgU3BsaW5lIGFycmF5IG9mIHBvaW50cyBhbmQgdGVuc2lvbi5cclxuICogISN6aCDmjIkgQ2F0bXVsbCBSb20g5qC35p2h5puy57q/6L2o6L+556e75Yqo5oyH5a6a55qE6Led56a744CCXHJcbiAqIEBtZXRob2QgY2F0bXVsbFJvbUJ5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdFxyXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludHNcclxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb24xID0gY2MuY2F0bXVsbFJvbUJ5KDMsIGFycmF5KTtcclxuICovXHJcbmNjLmNhdG11bGxSb21CeSA9IGZ1bmN0aW9uIChkdCwgcG9pbnRzKSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLkNhdG11bGxSb21CeShkdCwgcG9pbnRzKTtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=