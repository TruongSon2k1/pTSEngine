
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/CCArmatureDisplay.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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
var EventTarget = require('../../cocos2d/core/event/event-target');

dragonBones.CCArmatureDisplay = cc.Class({
  name: 'dragonBones.CCArmatureDisplay',
  properties: {
    // adapt old api
    node: {
      get: function get() {
        return this;
      }
    }
  },
  ctor: function ctor() {
    this._eventTarget = new EventTarget();
  },
  setEventTarget: function setEventTarget(eventTarget) {
    this._eventTarget = eventTarget;
  },
  getRootDisplay: function getRootDisplay() {
    var parentSlot = this._armature._parent;

    if (!parentSlot) {
      return this;
    }

    var slot;

    while (parentSlot) {
      slot = parentSlot;
      parentSlot = parentSlot._armature._parent;
    }

    return slot._armature.getDisplay();
  },
  convertToRootSpace: function convertToRootSpace(pos) {
    var slot = this._armature._parent;

    if (!slot) {
      return pos;
    }

    slot.updateWorldMatrix();
    var worldMatrix = slot._worldMatrix;
    var worldMatrixm = worldMatrix.m;
    var newPos = cc.v2(0, 0);
    newPos.x = pos.x * worldMatrixm[0] + pos.y * worldMatrixm[4] + worldMatrixm[12];
    newPos.y = pos.x * worldMatrixm[1] + pos.y * worldMatrixm[5] + worldMatrixm[13];
    return newPos;
  },
  convertToWorldSpace: function convertToWorldSpace(point) {
    var newPos = this.convertToRootSpace(point);
    var ccNode = this.getRootNode();
    var finalPos = ccNode.convertToWorldSpaceAR(newPos);
    return finalPos;
  },
  getRootNode: function getRootNode() {
    var rootDisplay = this.getRootDisplay();
    return rootDisplay && rootDisplay._ccNode;
  },
  ////////////////////////////////////
  // dragonbones api
  dbInit: function dbInit(armature) {
    this._armature = armature;
  },
  dbClear: function dbClear() {
    this._armature = null;
  },
  dbUpdate: function dbUpdate() {},
  advanceTimeBySelf: function advanceTimeBySelf(on) {
    this.shouldAdvanced = !!on;
  },
  hasDBEventListener: function hasDBEventListener(type) {
    return this._eventTarget.hasEventListener(type);
  },
  addDBEventListener: function addDBEventListener(type, listener, target) {
    this._eventTarget.on(type, listener, target);
  },
  removeDBEventListener: function removeDBEventListener(type, listener, target) {
    this._eventTarget.off(type, listener, target);
  },
  dispatchDBEvent: function dispatchDBEvent(type, eventObject) {
    this._eventTarget.emit(type, eventObject);
  } ////////////////////////////////////

});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXGRyYWdvbmJvbmVzXFxDQ0FybWF0dXJlRGlzcGxheS5qcyJdLCJuYW1lcyI6WyJFdmVudFRhcmdldCIsInJlcXVpcmUiLCJkcmFnb25Cb25lcyIsIkNDQXJtYXR1cmVEaXNwbGF5IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwibm9kZSIsImdldCIsImN0b3IiLCJfZXZlbnRUYXJnZXQiLCJzZXRFdmVudFRhcmdldCIsImV2ZW50VGFyZ2V0IiwiZ2V0Um9vdERpc3BsYXkiLCJwYXJlbnRTbG90IiwiX2FybWF0dXJlIiwiX3BhcmVudCIsInNsb3QiLCJnZXREaXNwbGF5IiwiY29udmVydFRvUm9vdFNwYWNlIiwicG9zIiwidXBkYXRlV29ybGRNYXRyaXgiLCJ3b3JsZE1hdHJpeCIsIl93b3JsZE1hdHJpeCIsIndvcmxkTWF0cml4bSIsIm0iLCJuZXdQb3MiLCJ2MiIsIngiLCJ5IiwiY29udmVydFRvV29ybGRTcGFjZSIsInBvaW50IiwiY2NOb2RlIiwiZ2V0Um9vdE5vZGUiLCJmaW5hbFBvcyIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsInJvb3REaXNwbGF5IiwiX2NjTm9kZSIsImRiSW5pdCIsImFybWF0dXJlIiwiZGJDbGVhciIsImRiVXBkYXRlIiwiYWR2YW5jZVRpbWVCeVNlbGYiLCJvbiIsInNob3VsZEFkdmFuY2VkIiwiaGFzREJFdmVudExpc3RlbmVyIiwidHlwZSIsImhhc0V2ZW50TGlzdGVuZXIiLCJhZGREQkV2ZW50TGlzdGVuZXIiLCJsaXN0ZW5lciIsInRhcmdldCIsInJlbW92ZURCRXZlbnRMaXN0ZW5lciIsIm9mZiIsImRpc3BhdGNoREJFdmVudCIsImV2ZW50T2JqZWN0IiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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UUFBakI7QUFDSCxHQW5Fb0M7QUFxRXJDQyxFQUFBQSxPQXJFcUMscUJBcUUxQjtBQUNQLFNBQUt6QixTQUFMLEdBQWlCLElBQWpCO0FBQ0gsR0F2RW9DO0FBeUVyQzBCLEVBQUFBLFFBekVxQyxzQkF5RXpCLENBRVgsQ0EzRW9DO0FBNkVyQ0MsRUFBQUEsaUJBN0VxQyw2QkE2RWpCQyxFQTdFaUIsRUE2RWI7QUFDcEIsU0FBS0MsY0FBTCxHQUFzQixDQUFDLENBQUNELEVBQXhCO0FBQ0gsR0EvRW9DO0FBaUZyQ0UsRUFBQUEsa0JBakZxQyw4QkFpRmpCQyxJQWpGaUIsRUFpRlg7QUFDdEIsV0FBTyxLQUFLcEMsWUFBTCxDQUFrQnFDLGdCQUFsQixDQUFtQ0QsSUFBbkMsQ0FBUDtBQUNILEdBbkZvQztBQXFGckNFLEVBQUFBLGtCQXJGcUMsOEJBcUZqQkYsSUFyRmlCLEVBcUZYRyxRQXJGVyxFQXFGREMsTUFyRkMsRUFxRk87QUFDeEMsU0FBS3hDLFlBQUwsQ0FBa0JpQyxFQUFsQixDQUFxQkcsSUFBckIsRUFBMkJHLFFBQTNCLEVBQXFDQyxNQUFyQztBQUNILEdBdkZvQztBQXlGckNDLEVBQUFBLHFCQXpGcUMsaUNBeUZkTCxJQXpGYyxFQXlGUkcsUUF6RlEsRUF5RkVDLE1BekZGLEVBeUZVO0FBQzNDLFNBQUt4QyxZQUFMLENBQWtCMEMsR0FBbEIsQ0FBc0JOLElBQXRCLEVBQTRCRyxRQUE1QixFQUFzQ0MsTUFBdEM7QUFDSCxHQTNGb0M7QUE2RnJDRyxFQUFBQSxlQTdGcUMsMkJBNkZuQlAsSUE3Rm1CLEVBNkZiUSxXQTdGYSxFQTZGQTtBQUNqQyxTQUFLNUMsWUFBTCxDQUFrQjZDLElBQWxCLENBQXVCVCxJQUF2QixFQUE2QlEsV0FBN0I7QUFDSCxHQS9Gb0MsQ0FnR3JDOztBQWhHcUMsQ0FBVCxDQUFoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxubGV0IEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL2V2ZW50L2V2ZW50LXRhcmdldCcpO1xyXG5cclxuZHJhZ29uQm9uZXMuQ0NBcm1hdHVyZURpc3BsYXkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnZHJhZ29uQm9uZXMuQ0NBcm1hdHVyZURpc3BsYXknLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBhZGFwdCBvbGQgYXBpXHJcbiAgICAgICAgbm9kZToge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9ldmVudFRhcmdldCA9IG5ldyBFdmVudFRhcmdldCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRFdmVudFRhcmdldCAoZXZlbnRUYXJnZXQpIHtcclxuICAgICAgICB0aGlzLl9ldmVudFRhcmdldCA9IGV2ZW50VGFyZ2V0O1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSb290RGlzcGxheSAoKSB7XHJcbiAgICAgICAgdmFyIHBhcmVudFNsb3QgPSB0aGlzLl9hcm1hdHVyZS5fcGFyZW50O1xyXG4gICAgICAgIGlmICghcGFyZW50U2xvdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHNsb3Q7XHJcbiAgICAgICAgd2hpbGUgKHBhcmVudFNsb3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzbG90ID0gcGFyZW50U2xvdDtcclxuICAgICAgICAgICAgcGFyZW50U2xvdCA9IHBhcmVudFNsb3QuX2FybWF0dXJlLl9wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzbG90Ll9hcm1hdHVyZS5nZXREaXNwbGF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnZlcnRUb1Jvb3RTcGFjZSAocG9zKSB7XHJcbiAgICAgICAgdmFyIHNsb3QgPSB0aGlzLl9hcm1hdHVyZS5fcGFyZW50O1xyXG4gICAgICAgIGlmICghc2xvdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBwb3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNsb3QudXBkYXRlV29ybGRNYXRyaXgoKTtcclxuXHJcbiAgICAgICAgbGV0IHdvcmxkTWF0cml4ID0gc2xvdC5fd29ybGRNYXRyaXg7XHJcbiAgICAgICAgbGV0IHdvcmxkTWF0cml4bSA9IHdvcmxkTWF0cml4Lm07XHJcbiAgICAgICAgbGV0IG5ld1BvcyA9IGNjLnYyKDAsMCk7XHJcbiAgICAgICAgbmV3UG9zLnggPSBwb3MueCAqIHdvcmxkTWF0cml4bVswXSArIHBvcy55ICogd29ybGRNYXRyaXhtWzRdICsgd29ybGRNYXRyaXhtWzEyXTtcclxuICAgICAgICBuZXdQb3MueSA9IHBvcy54ICogd29ybGRNYXRyaXhtWzFdICsgcG9zLnkgKiB3b3JsZE1hdHJpeG1bNV0gKyB3b3JsZE1hdHJpeG1bMTNdO1xyXG4gICAgICAgIHJldHVybiBuZXdQb3M7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnZlcnRUb1dvcmxkU3BhY2UgKHBvaW50KSB7XHJcbiAgICAgICAgdmFyIG5ld1BvcyA9IHRoaXMuY29udmVydFRvUm9vdFNwYWNlKHBvaW50KTtcclxuICAgICAgICB2YXIgY2NOb2RlID0gdGhpcy5nZXRSb290Tm9kZSgpO1xyXG4gICAgICAgIHZhciBmaW5hbFBvcyA9IGNjTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobmV3UG9zKTtcclxuICAgICAgICByZXR1cm4gZmluYWxQb3M7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJvb3ROb2RlICgpIHtcclxuICAgICAgICB2YXIgcm9vdERpc3BsYXkgPSB0aGlzLmdldFJvb3REaXNwbGF5KCk7XHJcbiAgICAgICAgcmV0dXJuIHJvb3REaXNwbGF5ICYmIHJvb3REaXNwbGF5Ll9jY05vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gZHJhZ29uYm9uZXMgYXBpXHJcbiAgICBkYkluaXQgKGFybWF0dXJlKSB7XHJcbiAgICAgICAgdGhpcy5fYXJtYXR1cmUgPSBhcm1hdHVyZTtcclxuICAgIH0sXHJcblxyXG4gICAgZGJDbGVhciAoKSB7XHJcbiAgICAgICAgdGhpcy5fYXJtYXR1cmUgPSBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICBkYlVwZGF0ZSAoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGFkdmFuY2VUaW1lQnlTZWxmICAob24pIHtcclxuICAgICAgICB0aGlzLnNob3VsZEFkdmFuY2VkID0gISFvbjtcclxuICAgIH0sXHJcblxyXG4gICAgaGFzREJFdmVudExpc3RlbmVyICh0eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50VGFyZ2V0Lmhhc0V2ZW50TGlzdGVuZXIodHlwZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZERCRXZlbnRMaXN0ZW5lciAodHlwZSwgbGlzdGVuZXIsIHRhcmdldCkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0Lm9uKHR5cGUsIGxpc3RlbmVyLCB0YXJnZXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVEQkV2ZW50TGlzdGVuZXIgKHR5cGUsIGxpc3RlbmVyLCB0YXJnZXQpIHtcclxuICAgICAgICB0aGlzLl9ldmVudFRhcmdldC5vZmYodHlwZSwgbGlzdGVuZXIsIHRhcmdldCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRpc3BhdGNoREJFdmVudCAgKHR5cGUsIGV2ZW50T2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXQuZW1pdCh0eXBlLCBldmVudE9iamVjdCk7XHJcbiAgICB9XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==