
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/editbox/types.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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

/**
 * !#en Enum for keyboard return types
 * !#zh 键盘的返回键类型
 * @readonly
 * @enum EditBox.KeyboardReturnType
 */
var KeyboardReturnType = cc.Enum({
  /**
   * !#en TODO
   * !#zh 默认
   * @property {Number} DEFAULT
   */
  DEFAULT: 0,

  /**
   * !#en TODO
   * !#zh 完成类型
   * @property {Number} DONE
   */
  DONE: 1,

  /**
   * !#en TODO
   * !#zh 发送类型
   * @property {Number} SEND
   */
  SEND: 2,

  /**
   * !#en TODO
   * !#zh 搜索类型
   * @property {Number} SEARCH
   */
  SEARCH: 3,

  /**
   * !#en TODO
   * !#zh 跳转类型
   * @property {Number} GO
   */
  GO: 4,

  /**
   * !#en TODO
   * !#zh 下一个类型
   * @property {Number} NEXT
   */
  NEXT: 5
});
/**
 * !#en The EditBox's InputMode defines the type of text that the user is allowed to enter.
 * !#zh 输入模式
 * @readonly
 * @enum EditBox.InputMode
 */

var InputMode = cc.Enum({
  /**
   * !#en TODO
   * !#zh 用户可以输入任何文本，包括换行符。
   * @property {Number} ANY
   */
  ANY: 0,

  /**
   * !#en The user is allowed to enter an e-mail address.
   * !#zh 允许用户输入一个电子邮件地址。
   * @property {Number} EMAIL_ADDR
   */
  EMAIL_ADDR: 1,

  /**
   * !#en The user is allowed to enter an integer value.
   * !#zh 允许用户输入一个整数值。
   * @property {Number} NUMERIC
   */
  NUMERIC: 2,

  /**
   * !#en The user is allowed to enter a phone number.
   * !#zh 允许用户输入一个电话号码。
   * @property {Number} PHONE_NUMBER
   */
  PHONE_NUMBER: 3,

  /**
   * !#en The user is allowed to enter a URL.
   * !#zh 允许用户输入一个 URL。
   * @property {Number} URL
   */
  URL: 4,

  /**
   * !#en
   * The user is allowed to enter a real number value.
   * This extends kEditBoxInputModeNumeric by allowing a decimal point.
   * !#zh
   * 允许用户输入一个实数。
   * @property {Number} DECIMAL
   */
  DECIMAL: 5,

  /**
   * !#en The user is allowed to enter any text, except for line breaks.
   * !#zh 除了换行符以外，用户可以输入任何文本。
   * @property {Number} SINGLE_LINE
   */
  SINGLE_LINE: 6
});
/**
 * !#en Enum for the EditBox's input flags
 * !#zh 定义了一些用于设置文本显示和文本格式化的标志位。
 * @readonly
 * @enum EditBox.InputFlag
 */

var InputFlag = cc.Enum({
  /**
   * !#en
   * Indicates that the text entered is confidential data that should be
   * obscured whenever possible. This implies EDIT_BOX_INPUT_FLAG_SENSITIVE.
   * !#zh
   * 表明输入的文本是保密的数据，任何时候都应该隐藏起来，它隐含了 EDIT_BOX_INPUT_FLAG_SENSITIVE。
   * @property {Number} PASSWORD
   */
  PASSWORD: 0,

  /**
   * !#en
   * Indicates that the text entered is sensitive data that the
   * implementation must never store into a dictionary or table for use
   * in predictive, auto-completing, or other accelerated input schemes.
   * A credit card number is an example of sensitive data.
   * !#zh
   * 表明输入的文本是敏感数据，它禁止存储到字典或表里面，也不能用来自动补全和提示用户输入。
   * 一个信用卡号码就是一个敏感数据的例子。
   * @property {Number} SENSITIVE
   */
  SENSITIVE: 1,

  /**
   * !#en
   * This flag is a hint to the implementation that during text editing,
   * the initial letter of each word should be capitalized.
   * !#zh
   *  这个标志用来指定在文本编辑的时候，是否把每一个单词的首字母大写。
   * @property {Number} INITIAL_CAPS_WORD
   */
  INITIAL_CAPS_WORD: 2,

  /**
   * !#en
   * This flag is a hint to the implementation that during text editing,
   * the initial letter of each sentence should be capitalized.
   * !#zh
   * 这个标志用来指定在文本编辑是否每个句子的首字母大写。
   * @property {Number} INITIAL_CAPS_SENTENCE
   */
  INITIAL_CAPS_SENTENCE: 3,

  /**
   * !#en Capitalize all characters automatically.
   * !#zh 自动把输入的所有字符大写。
   * @property {Number} INITIAL_CAPS_ALL_CHARACTERS
   */
  INITIAL_CAPS_ALL_CHARACTERS: 4,

  /**
   * Don't do anything with the input text.
   * @property {Number} DEFAULT
   */
  DEFAULT: 5
});
module.exports = {
  KeyboardReturnType: KeyboardReturnType,
  InputMode: InputMode,
  InputFlag: InputFlag
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXGVkaXRib3hcXHR5cGVzLmpzIl0sIm5hbWVzIjpbIktleWJvYXJkUmV0dXJuVHlwZSIsImNjIiwiRW51bSIsIkRFRkFVTFQiLCJET05FIiwiU0VORCIsIlNFQVJDSCIsIkdPIiwiTkVYVCIsIklucHV0TW9kZSIsIkFOWSIsIkVNQUlMX0FERFIiLCJOVU1FUklDIiwiUEhPTkVfTlVNQkVSIiwiVVJMIiwiREVDSU1BTCIsIlNJTkdMRV9MSU5FIiwiSW5wdXRGbGFnIiwiUEFTU1dPUkQiLCJTRU5TSVRJVkUiLCJJTklUSUFMX0NBUFNfV09SRCIsIklOSVRJQUxfQ0FQU19TRU5URU5DRSIsIklOSVRJQUxfQ0FQU19BTExfQ0hBUkFDVEVSUyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsa0JBQWtCLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzdCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsT0FBTyxFQUFFLENBTm9COztBQU83QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLElBQUksRUFBRSxDQVp1Qjs7QUFhN0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxJQUFJLEVBQUUsQ0FsQnVCOztBQW1CN0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxNQUFNLEVBQUUsQ0F4QnFCOztBQXlCN0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxFQUFFLEVBQUUsQ0E5QnlCOztBQStCN0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxJQUFJLEVBQUU7QUFwQ3VCLENBQVIsQ0FBekI7QUF1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlDLFNBQVMsR0FBR1IsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJUSxFQUFBQSxHQUFHLEVBQUUsQ0FOZTs7QUFPcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxVQUFVLEVBQUUsQ0FaUTs7QUFhcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxPQUFPLEVBQUUsQ0FsQlc7O0FBbUJwQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFlBQVksRUFBRSxDQXhCTTs7QUF5QnBCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsR0FBRyxFQUFFLENBOUJlOztBQStCcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxPQUFPLEVBQUUsQ0F2Q1c7O0FBd0NwQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFdBQVcsRUFBRTtBQTdDTyxDQUFSLENBQWhCO0FBZ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxJQUFJQyxTQUFTLEdBQUdoQixFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNwQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lnQixFQUFBQSxRQUFRLEVBQUUsQ0FUVTs7QUFVcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxTQUFTLEVBQUUsQ0FyQlM7O0FBc0JwQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLGlCQUFpQixFQUFFLENBOUJDOztBQStCcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxxQkFBcUIsRUFBRSxDQXZDSDs7QUF3Q3BCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsMkJBQTJCLEVBQUUsQ0E3Q1Q7O0FBOENwQjtBQUNKO0FBQ0E7QUFDQTtBQUNJbkIsRUFBQUEsT0FBTyxFQUFFO0FBbERXLENBQVIsQ0FBaEI7QUFxREFvQixNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYnhCLEVBQUFBLGtCQUFrQixFQUFFQSxrQkFEUDtBQUViUyxFQUFBQSxTQUFTLEVBQUVBLFNBRkU7QUFHYlEsRUFBQUEsU0FBUyxFQUFFQTtBQUhFLENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbi8qKlxyXG4gKiAhI2VuIEVudW0gZm9yIGtleWJvYXJkIHJldHVybiB0eXBlc1xyXG4gKiAhI3poIOmUruebmOeahOi/lOWbnumUruexu+Wei1xyXG4gKiBAcmVhZG9ubHlcclxuICogQGVudW0gRWRpdEJveC5LZXlib2FyZFJldHVyblR5cGVcclxuICovXHJcbmxldCBLZXlib2FyZFJldHVyblR5cGUgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUT0RPXHJcbiAgICAgKiAhI3poIOm7mOiupFxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IERFRkFVTFRcclxuICAgICAqL1xyXG4gICAgREVGQVVMVDogMCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUT0RPXHJcbiAgICAgKiAhI3poIOWujOaIkOexu+Wei1xyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IERPTkVcclxuICAgICAqL1xyXG4gICAgRE9ORTogMSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUT0RPXHJcbiAgICAgKiAhI3poIOWPkemAgeexu+Wei1xyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNFTkRcclxuICAgICAqL1xyXG4gICAgU0VORDogMixcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUT0RPXHJcbiAgICAgKiAhI3poIOaQnOe0ouexu+Wei1xyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNFQVJDSFxyXG4gICAgICovXHJcbiAgICBTRUFSQ0g6IDMsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVE9ET1xyXG4gICAgICogISN6aCDot7PovaznsbvlnotcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBHT1xyXG4gICAgICovXHJcbiAgICBHTzogNCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUT0RPXHJcbiAgICAgKiAhI3poIOS4i+S4gOS4quexu+Wei1xyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE5FWFRcclxuICAgICAqL1xyXG4gICAgTkVYVDogNVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBFZGl0Qm94J3MgSW5wdXRNb2RlIGRlZmluZXMgdGhlIHR5cGUgb2YgdGV4dCB0aGF0IHRoZSB1c2VyIGlzIGFsbG93ZWQgdG8gZW50ZXIuXHJcbiAqICEjemgg6L6T5YWl5qih5byPXHJcbiAqIEByZWFkb25seVxyXG4gKiBAZW51bSBFZGl0Qm94LklucHV0TW9kZVxyXG4gKi9cclxubGV0IElucHV0TW9kZSA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRPRE9cclxuICAgICAqICEjemgg55So5oi35Y+v5Lul6L6T5YWl5Lu75L2V5paH5pys77yM5YyF5ous5o2i6KGM56ym44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQU5ZXHJcbiAgICAgKi9cclxuICAgIEFOWTogMCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgdXNlciBpcyBhbGxvd2VkIHRvIGVudGVyIGFuIGUtbWFpbCBhZGRyZXNzLlxyXG4gICAgICogISN6aCDlhYHorrjnlKjmiLfovpPlhaXkuIDkuKrnlLXlrZDpgq7ku7blnLDlnYDjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBFTUFJTF9BRERSXHJcbiAgICAgKi9cclxuICAgIEVNQUlMX0FERFI6IDEsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHVzZXIgaXMgYWxsb3dlZCB0byBlbnRlciBhbiBpbnRlZ2VyIHZhbHVlLlxyXG4gICAgICogISN6aCDlhYHorrjnlKjmiLfovpPlhaXkuIDkuKrmlbTmlbDlgLzjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBOVU1FUklDXHJcbiAgICAgKi9cclxuICAgIE5VTUVSSUM6IDIsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHVzZXIgaXMgYWxsb3dlZCB0byBlbnRlciBhIHBob25lIG51bWJlci5cclxuICAgICAqICEjemgg5YWB6K6455So5oi36L6T5YWl5LiA5Liq55S16K+d5Y+356CB44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUEhPTkVfTlVNQkVSXHJcbiAgICAgKi9cclxuICAgIFBIT05FX05VTUJFUjogMyxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgdXNlciBpcyBhbGxvd2VkIHRvIGVudGVyIGEgVVJMLlxyXG4gICAgICogISN6aCDlhYHorrjnlKjmiLfovpPlhaXkuIDkuKogVVJM44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVVJMXHJcbiAgICAgKi9cclxuICAgIFVSTDogNCxcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIHVzZXIgaXMgYWxsb3dlZCB0byBlbnRlciBhIHJlYWwgbnVtYmVyIHZhbHVlLlxyXG4gICAgICogVGhpcyBleHRlbmRzIGtFZGl0Qm94SW5wdXRNb2RlTnVtZXJpYyBieSBhbGxvd2luZyBhIGRlY2ltYWwgcG9pbnQuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlhYHorrjnlKjmiLfovpPlhaXkuIDkuKrlrp7mlbDjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBERUNJTUFMXHJcbiAgICAgKi9cclxuICAgIERFQ0lNQUw6IDUsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHVzZXIgaXMgYWxsb3dlZCB0byBlbnRlciBhbnkgdGV4dCwgZXhjZXB0IGZvciBsaW5lIGJyZWFrcy5cclxuICAgICAqICEjemgg6Zmk5LqG5o2i6KGM56ym5Lul5aSW77yM55So5oi35Y+v5Lul6L6T5YWl5Lu75L2V5paH5pys44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0lOR0xFX0xJTkVcclxuICAgICAqL1xyXG4gICAgU0lOR0xFX0xJTkU6IDZcclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBFbnVtIGZvciB0aGUgRWRpdEJveCdzIGlucHV0IGZsYWdzXHJcbiAqICEjemgg5a6a5LmJ5LqG5LiA5Lqb55So5LqO6K6+572u5paH5pys5pi+56S65ZKM5paH5pys5qC85byP5YyW55qE5qCH5b+X5L2N44CCXHJcbiAqIEByZWFkb25seVxyXG4gKiBAZW51bSBFZGl0Qm94LklucHV0RmxhZ1xyXG4gKi9cclxubGV0IElucHV0RmxhZyA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCBlbnRlcmVkIGlzIGNvbmZpZGVudGlhbCBkYXRhIHRoYXQgc2hvdWxkIGJlXHJcbiAgICAgKiBvYnNjdXJlZCB3aGVuZXZlciBwb3NzaWJsZS4gVGhpcyBpbXBsaWVzIEVESVRfQk9YX0lOUFVUX0ZMQUdfU0VOU0lUSVZFLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6KGo5piO6L6T5YWl55qE5paH5pys5piv5L+d5a+G55qE5pWw5o2u77yM5Lu75L2V5pe25YCZ6YO95bqU6K+l6ZqQ6JeP6LW35p2l77yM5a6D6ZqQ5ZCr5LqGIEVESVRfQk9YX0lOUFVUX0ZMQUdfU0VOU0lUSVZF44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUEFTU1dPUkRcclxuICAgICAqL1xyXG4gICAgUEFTU1dPUkQ6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IGVudGVyZWQgaXMgc2Vuc2l0aXZlIGRhdGEgdGhhdCB0aGVcclxuICAgICAqIGltcGxlbWVudGF0aW9uIG11c3QgbmV2ZXIgc3RvcmUgaW50byBhIGRpY3Rpb25hcnkgb3IgdGFibGUgZm9yIHVzZVxyXG4gICAgICogaW4gcHJlZGljdGl2ZSwgYXV0by1jb21wbGV0aW5nLCBvciBvdGhlciBhY2NlbGVyYXRlZCBpbnB1dCBzY2hlbWVzLlxyXG4gICAgICogQSBjcmVkaXQgY2FyZCBudW1iZXIgaXMgYW4gZXhhbXBsZSBvZiBzZW5zaXRpdmUgZGF0YS5cclxuICAgICAqICEjemhcclxuICAgICAqIOihqOaYjui+k+WFpeeahOaWh+acrOaYr+aVj+aEn+aVsOaNru+8jOWug+emgeatouWtmOWCqOWIsOWtl+WFuOaIluihqOmHjOmdou+8jOS5n+S4jeiDveeUqOadpeiHquWKqOihpeWFqOWSjOaPkOekuueUqOaIt+i+k+WFpeOAglxyXG4gICAgICog5LiA5Liq5L+h55So5Y2h5Y+356CB5bCx5piv5LiA5Liq5pWP5oSf5pWw5o2u55qE5L6L5a2Q44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0VOU0lUSVZFXHJcbiAgICAgKi9cclxuICAgIFNFTlNJVElWRTogMSxcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhpcyBmbGFnIGlzIGEgaGludCB0byB0aGUgaW1wbGVtZW50YXRpb24gdGhhdCBkdXJpbmcgdGV4dCBlZGl0aW5nLFxyXG4gICAgICogdGhlIGluaXRpYWwgbGV0dGVyIG9mIGVhY2ggd29yZCBzaG91bGQgYmUgY2FwaXRhbGl6ZWQuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiAg6L+Z5Liq5qCH5b+X55So5p2l5oyH5a6a5Zyo5paH5pys57yW6L6R55qE5pe25YCZ77yM5piv5ZCm5oqK5q+P5LiA5Liq5Y2V6K+N55qE6aaW5a2X5q+N5aSn5YaZ44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSU5JVElBTF9DQVBTX1dPUkRcclxuICAgICAqL1xyXG4gICAgSU5JVElBTF9DQVBTX1dPUkQ6IDIsXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRoaXMgZmxhZyBpcyBhIGhpbnQgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRoYXQgZHVyaW5nIHRleHQgZWRpdGluZyxcclxuICAgICAqIHRoZSBpbml0aWFsIGxldHRlciBvZiBlYWNoIHNlbnRlbmNlIHNob3VsZCBiZSBjYXBpdGFsaXplZC5cclxuICAgICAqICEjemhcclxuICAgICAqIOi/meS4quagh+W/l+eUqOadpeaMh+WumuWcqOaWh+acrOe8lui+keaYr+WQpuavj+S4quWPpeWtkOeahOmmluWtl+avjeWkp+WGmeOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IElOSVRJQUxfQ0FQU19TRU5URU5DRVxyXG4gICAgICovXHJcbiAgICBJTklUSUFMX0NBUFNfU0VOVEVOQ0U6IDMsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ2FwaXRhbGl6ZSBhbGwgY2hhcmFjdGVycyBhdXRvbWF0aWNhbGx5LlxyXG4gICAgICogISN6aCDoh6rliqjmiorovpPlhaXnmoTmiYDmnInlrZfnrKblpKflhpnjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBJTklUSUFMX0NBUFNfQUxMX0NIQVJBQ1RFUlNcclxuICAgICAqL1xyXG4gICAgSU5JVElBTF9DQVBTX0FMTF9DSEFSQUNURVJTOiA0LFxyXG4gICAgLyoqXHJcbiAgICAgKiBEb24ndCBkbyBhbnl0aGluZyB3aXRoIHRoZSBpbnB1dCB0ZXh0LlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IERFRkFVTFRcclxuICAgICAqL1xyXG4gICAgREVGQVVMVDogNVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgS2V5Ym9hcmRSZXR1cm5UeXBlOiBLZXlib2FyZFJldHVyblR5cGUsXHJcbiAgICBJbnB1dE1vZGU6IElucHV0TW9kZSxcclxuICAgIElucHV0RmxhZzogSW5wdXRGbGFnXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9