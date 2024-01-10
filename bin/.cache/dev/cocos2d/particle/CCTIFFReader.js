
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/particle/CCTIFFReader.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2011 Gordon P. Hemsley
 http://gphemsley.org/

 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
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
var debug = require('../core/CCDebug');
/**
 * cc.tiffReader is a singleton object, it's a tiff file reader, it can parse byte array to draw into a canvas
 * @class
 * @name tiffReader
 */


var tiffReader =
/** @lends tiffReader# */
{
  _littleEndian: false,
  _tiffData: null,
  _fileDirectories: [],
  getUint8: function getUint8(offset) {
    return this._tiffData[offset];
  },
  getUint16: function getUint16(offset) {
    if (this._littleEndian) return this._tiffData[offset + 1] << 8 | this._tiffData[offset];else return this._tiffData[offset] << 8 | this._tiffData[offset + 1];
  },
  getUint32: function getUint32(offset) {
    var a = this._tiffData;
    if (this._littleEndian) return a[offset + 3] << 24 | a[offset + 2] << 16 | a[offset + 1] << 8 | a[offset];else return a[offset] << 24 | a[offset + 1] << 16 | a[offset + 2] << 8 | a[offset + 3];
  },
  checkLittleEndian: function checkLittleEndian() {
    var BOM = this.getUint16(0);

    if (BOM === 0x4949) {
      this.littleEndian = true;
    } else if (BOM === 0x4D4D) {
      this.littleEndian = false;
    } else {
      console.log(BOM);
      throw TypeError(debug.getError(6019));
    }

    return this.littleEndian;
  },
  hasTowel: function hasTowel() {
    // Check for towel.
    if (this.getUint16(2) !== 42) {
      throw RangeError(debug.getError(6020));
      return false;
    }

    return true;
  },
  getFieldTypeName: function getFieldTypeName(fieldType) {
    var typeNames = this.fieldTypeNames;

    if (fieldType in typeNames) {
      return typeNames[fieldType];
    }

    return null;
  },
  getFieldTagName: function getFieldTagName(fieldTag) {
    var tagNames = this.fieldTagNames;

    if (fieldTag in tagNames) {
      return tagNames[fieldTag];
    } else {
      cc.logID(6021, fieldTag);
      return "Tag" + fieldTag;
    }
  },
  getFieldTypeLength: function getFieldTypeLength(fieldTypeName) {
    if (['BYTE', 'ASCII', 'SBYTE', 'UNDEFINED'].indexOf(fieldTypeName) !== -1) {
      return 1;
    } else if (['SHORT', 'SSHORT'].indexOf(fieldTypeName) !== -1) {
      return 2;
    } else if (['LONG', 'SLONG', 'FLOAT'].indexOf(fieldTypeName) !== -1) {
      return 4;
    } else if (['RATIONAL', 'SRATIONAL', 'DOUBLE'].indexOf(fieldTypeName) !== -1) {
      return 8;
    }

    return null;
  },
  getFieldValues: function getFieldValues(fieldTagName, fieldTypeName, typeCount, valueOffset) {
    var fieldValues = [];
    var fieldTypeLength = this.getFieldTypeLength(fieldTypeName);
    var fieldValueSize = fieldTypeLength * typeCount;

    if (fieldValueSize <= 4) {
      // The value is stored at the big end of the valueOffset.
      if (this.littleEndian === false) fieldValues.push(valueOffset >>> (4 - fieldTypeLength) * 8);else fieldValues.push(valueOffset);
    } else {
      for (var i = 0; i < typeCount; i++) {
        var indexOffset = fieldTypeLength * i;

        if (fieldTypeLength >= 8) {
          if (['RATIONAL', 'SRATIONAL'].indexOf(fieldTypeName) !== -1) {
            // Numerator
            fieldValues.push(this.getUint32(valueOffset + indexOffset)); // Denominator

            fieldValues.push(this.getUint32(valueOffset + indexOffset + 4));
          } else {
            cc.logID(8000);
          }
        } else {
          fieldValues.push(this.getBytes(fieldTypeLength, valueOffset + indexOffset));
        }
      }
    }

    if (fieldTypeName === 'ASCII') {
      fieldValues.forEach(function (e, i, a) {
        a[i] = String.fromCharCode(e);
      });
    }

    return fieldValues;
  },
  getBytes: function getBytes(numBytes, offset) {
    if (numBytes <= 0) {
      cc.logID(8001);
    } else if (numBytes <= 1) {
      return this.getUint8(offset);
    } else if (numBytes <= 2) {
      return this.getUint16(offset);
    } else if (numBytes <= 3) {
      return this.getUint32(offset) >>> 8;
    } else if (numBytes <= 4) {
      return this.getUint32(offset);
    } else {
      cc.logID(8002);
    }
  },
  getBits: function getBits(numBits, byteOffset, bitOffset) {
    bitOffset = bitOffset || 0;
    var extraBytes = Math.floor(bitOffset / 8);
    var newByteOffset = byteOffset + extraBytes;
    var totalBits = bitOffset + numBits;
    var shiftRight = 32 - numBits;
    var shiftLeft, rawBits;

    if (totalBits <= 0) {
      cc.logID(6023);
    } else if (totalBits <= 8) {
      shiftLeft = 24 + bitOffset;
      rawBits = this.getUint8(newByteOffset);
    } else if (totalBits <= 16) {
      shiftLeft = 16 + bitOffset;
      rawBits = this.getUint16(newByteOffset);
    } else if (totalBits <= 32) {
      shiftLeft = bitOffset;
      rawBits = this.getUint32(newByteOffset);
    } else {
      cc.logID(6022);
    }

    return {
      'bits': rawBits << shiftLeft >>> shiftRight,
      'byteOffset': newByteOffset + Math.floor(totalBits / 8),
      'bitOffset': totalBits % 8
    };
  },
  parseFileDirectory: function parseFileDirectory(byteOffset) {
    var numDirEntries = this.getUint16(byteOffset);
    var tiffFields = [];

    for (var i = byteOffset + 2, entryCount = 0; entryCount < numDirEntries; i += 12, entryCount++) {
      var fieldTag = this.getUint16(i);
      var fieldType = this.getUint16(i + 2);
      var typeCount = this.getUint32(i + 4);
      var valueOffset = this.getUint32(i + 8);
      var fieldTagName = this.getFieldTagName(fieldTag);
      var fieldTypeName = this.getFieldTypeName(fieldType);
      var fieldValues = this.getFieldValues(fieldTagName, fieldTypeName, typeCount, valueOffset);
      tiffFields[fieldTagName] = {
        type: fieldTypeName,
        values: fieldValues
      };
    }

    this._fileDirectories.push(tiffFields);

    var nextIFDByteOffset = this.getUint32(i);

    if (nextIFDByteOffset !== 0x00000000) {
      this.parseFileDirectory(nextIFDByteOffset);
    }
  },
  clampColorSample: function clampColorSample(colorSample, bitsPerSample) {
    var multiplier = Math.pow(2, 8 - bitsPerSample);
    return Math.floor(colorSample * multiplier + (multiplier - 1));
  },

  /**
   * @function
   * @param {Array} tiffData
   * @param {HTMLCanvasElement} canvas
   * @returns {*}
   */
  parseTIFF: function parseTIFF(tiffData, canvas) {
    canvas = canvas || document.createElement('canvas');
    this._tiffData = tiffData;
    this.canvas = canvas;
    this.checkLittleEndian();

    if (!this.hasTowel()) {
      return;
    }

    var firstIFDByteOffset = this.getUint32(4);
    this._fileDirectories.length = 0;
    this.parseFileDirectory(firstIFDByteOffset);
    var fileDirectory = this._fileDirectories[0];
    var imageWidth = fileDirectory['ImageWidth'].values[0];
    var imageLength = fileDirectory['ImageLength'].values[0];
    this.canvas.width = imageWidth;
    this.canvas.height = imageLength;
    var strips = [];
    var compression = fileDirectory['Compression'] ? fileDirectory['Compression'].values[0] : 1;
    var samplesPerPixel = fileDirectory['SamplesPerPixel'].values[0];
    var sampleProperties = [];
    var bitsPerPixel = 0;
    var hasBytesPerPixel = false;
    fileDirectory['BitsPerSample'].values.forEach(function (bitsPerSample, i, bitsPerSampleValues) {
      sampleProperties[i] = {
        bitsPerSample: bitsPerSample,
        hasBytesPerSample: false,
        bytesPerSample: undefined
      };

      if (bitsPerSample % 8 === 0) {
        sampleProperties[i].hasBytesPerSample = true;
        sampleProperties[i].bytesPerSample = bitsPerSample / 8;
      }

      bitsPerPixel += bitsPerSample;
    }, this);

    if (bitsPerPixel % 8 === 0) {
      hasBytesPerPixel = true;
      var bytesPerPixel = bitsPerPixel / 8;
    }

    var stripOffsetValues = fileDirectory['StripOffsets'].values;
    var numStripOffsetValues = stripOffsetValues.length; // StripByteCounts is supposed to be required, but see if we can recover anyway.

    if (fileDirectory['StripByteCounts']) {
      var stripByteCountValues = fileDirectory['StripByteCounts'].values;
    } else {
      cc.logID(8003); // Infer StripByteCounts, if possible.

      if (numStripOffsetValues === 1) {
        var stripByteCountValues = [Math.ceil(imageWidth * imageLength * bitsPerPixel / 8)];
      } else {
        throw Error(debug.getError(6024));
      }
    } // Loop through strips and decompress as necessary.


    for (var i = 0; i < numStripOffsetValues; i++) {
      var stripOffset = stripOffsetValues[i];
      strips[i] = [];
      var stripByteCount = stripByteCountValues[i]; // Loop through pixels.

      for (var byteOffset = 0, bitOffset = 0, jIncrement = 1, getHeader = true, pixel = [], numBytes = 0, sample = 0, currentSample = 0; byteOffset < stripByteCount; byteOffset += jIncrement) {
        // Decompress strip.
        switch (compression) {
          // Uncompressed
          case 1:
            // Loop through samples (sub-pixels).
            for (var m = 0, pixel = []; m < samplesPerPixel; m++) {
              if (sampleProperties[m].hasBytesPerSample) {
                // XXX: This is wrong!
                var sampleOffset = sampleProperties[m].bytesPerSample * m;
                pixel.push(this.getBytes(sampleProperties[m].bytesPerSample, stripOffset + byteOffset + sampleOffset));
              } else {
                var sampleInfo = this.getBits(sampleProperties[m].bitsPerSample, stripOffset + byteOffset, bitOffset);
                pixel.push(sampleInfo.bits);
                byteOffset = sampleInfo.byteOffset - stripOffset;
                bitOffset = sampleInfo.bitOffset;
                throw RangeError(debug.getError(6025));
              }
            }

            strips[i].push(pixel);

            if (hasBytesPerPixel) {
              jIncrement = bytesPerPixel;
            } else {
              jIncrement = 0;
              throw RangeError(debug.getError(6026));
            }

            break;
          // CITT Group 3 1-Dimensional Modified Huffman run-length encoding

          case 2:
            // XXX: Use PDF.js code?
            break;
          // Group 3 Fax

          case 3:
            // XXX: Use PDF.js code?
            break;
          // Group 4 Fax

          case 4:
            // XXX: Use PDF.js code?
            break;
          // LZW

          case 5:
            // XXX: Use PDF.js code?
            break;
          // Old-style JPEG (TIFF 6.0)

          case 6:
            // XXX: Use PDF.js code?
            break;
          // New-style JPEG (TIFF Specification Supplement 2)

          case 7:
            // XXX: Use PDF.js code?
            break;
          // PackBits

          case 32773:
            // Are we ready for a new block?
            if (getHeader) {
              getHeader = false;
              var blockLength = 1;
              var iterations = 1; // The header byte is signed.

              var header = this.getInt8(stripOffset + byteOffset);

              if (header >= 0 && header <= 127) {
                // Normal pixels.
                blockLength = header + 1;
              } else if (header >= -127 && header <= -1) {
                // Collapsed pixels.
                iterations = -header + 1;
              } else
                /*if (header === -128)*/
                {
                  // Placeholder byte?
                  getHeader = true;
                }
            } else {
              var currentByte = this.getUint8(stripOffset + byteOffset); // Duplicate bytes, if necessary.

              for (var m = 0; m < iterations; m++) {
                if (sampleProperties[sample].hasBytesPerSample) {
                  // We're reading one byte at a time, so we need to handle multi-byte samples.
                  currentSample = currentSample << 8 * numBytes | currentByte;
                  numBytes++; // Is our sample complete?

                  if (numBytes === sampleProperties[sample].bytesPerSample) {
                    pixel.push(currentSample);
                    currentSample = numBytes = 0;
                    sample++;
                  }
                } else {
                  throw RangeError(debug.getError(6025));
                } // Is our pixel complete?


                if (sample === samplesPerPixel) {
                  strips[i].push(pixel);
                  pixel = [];
                  sample = 0;
                }
              }

              blockLength--; // Is our block complete?

              if (blockLength === 0) {
                getHeader = true;
              }
            }

            jIncrement = 1;
            break;
          // Unknown compression algorithm

          default:
            // Do not attempt to parse the image data.
            break;
        }
      }
    }

    if (canvas.getContext) {
      var ctx = this.canvas.getContext("2d"); // Set a default fill style.

      ctx.fillStyle = "rgba(255, 255, 255, 0)"; // If RowsPerStrip is missing, the whole image is in one strip.

      var rowsPerStrip = fileDirectory['RowsPerStrip'] ? fileDirectory['RowsPerStrip'].values[0] : imageLength;
      var numStrips = strips.length;
      var imageLengthModRowsPerStrip = imageLength % rowsPerStrip;
      var rowsInLastStrip = imageLengthModRowsPerStrip === 0 ? rowsPerStrip : imageLengthModRowsPerStrip;
      var numRowsInStrip = rowsPerStrip;
      var numRowsInPreviousStrip = 0;
      var photometricInterpretation = fileDirectory['PhotometricInterpretation'].values[0];
      var extraSamplesValues = [];
      var numExtraSamples = 0;

      if (fileDirectory['ExtraSamples']) {
        extraSamplesValues = fileDirectory['ExtraSamples'].values;
        numExtraSamples = extraSamplesValues.length;
      }

      if (fileDirectory['ColorMap']) {
        var colorMapValues = fileDirectory['ColorMap'].values;
        var colorMapSampleSize = Math.pow(2, sampleProperties[0].bitsPerSample);
      } // Loop through the strips in the image.


      for (var i = 0; i < numStrips; i++) {
        // The last strip may be short.
        if (i + 1 === numStrips) {
          numRowsInStrip = rowsInLastStrip;
        }

        var numPixels = strips[i].length;
        var yPadding = numRowsInPreviousStrip * i; // Loop through the rows in the strip.

        for (var y = 0, j = 0; y < numRowsInStrip, j < numPixels; y++) {
          // Loop through the pixels in the row.
          for (var x = 0; x < imageWidth; x++, j++) {
            var pixelSamples = strips[i][j];
            var red = 0;
            var green = 0;
            var blue = 0;
            var opacity = 1.0;

            if (numExtraSamples > 0) {
              for (var k = 0; k < numExtraSamples; k++) {
                if (extraSamplesValues[k] === 1 || extraSamplesValues[k] === 2) {
                  // Clamp opacity to the range [0,1].
                  opacity = pixelSamples[3 + k] / 256;
                  break;
                }
              }
            }

            switch (photometricInterpretation) {
              // Bilevel or Grayscale
              // WhiteIsZero
              case 0:
                if (sampleProperties[0].hasBytesPerSample) {
                  var invertValue = Math.pow(0x10, sampleProperties[0].bytesPerSample * 2);
                } // Invert samples.


                pixelSamples.forEach(function (sample, index, samples) {
                  samples[index] = invertValue - sample;
                });
              // Bilevel or Grayscale
              // BlackIsZero

              case 1:
                red = green = blue = this.clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
                break;
              // RGB Full Color

              case 2:
                red = this.clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
                green = this.clampColorSample(pixelSamples[1], sampleProperties[1].bitsPerSample);
                blue = this.clampColorSample(pixelSamples[2], sampleProperties[2].bitsPerSample);
                break;
              // RGB Color Palette

              case 3:
                if (colorMapValues === undefined) {
                  throw Error(debug.getError(6027));
                }

                var colorMapIndex = pixelSamples[0];
                red = this.clampColorSample(colorMapValues[colorMapIndex], 16);
                green = this.clampColorSample(colorMapValues[colorMapSampleSize + colorMapIndex], 16);
                blue = this.clampColorSample(colorMapValues[2 * colorMapSampleSize + colorMapIndex], 16);
                break;
              // Unknown Photometric Interpretation

              default:
                throw RangeError(debug.getError(6028, photometricInterpretation));
                break;
            }

            ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + opacity + ")";
            ctx.fillRect(x, yPadding + y, 1, 1);
          }
        }

        numRowsInPreviousStrip = numRowsInStrip;
      }
    }

    return this.canvas;
  },
  // See: http://www.digitizationguidelines.gov/guidelines/TIFF_Metadata_Final.pdf
  // See: http://www.digitalpreservation.gov/formats/content/tiff_tags.shtml
  fieldTagNames: {
    // TIFF Baseline
    0x013B: 'Artist',
    0x0102: 'BitsPerSample',
    0x0109: 'CellLength',
    0x0108: 'CellWidth',
    0x0140: 'ColorMap',
    0x0103: 'Compression',
    0x8298: 'Copyright',
    0x0132: 'DateTime',
    0x0152: 'ExtraSamples',
    0x010A: 'FillOrder',
    0x0121: 'FreeByteCounts',
    0x0120: 'FreeOffsets',
    0x0123: 'GrayResponseCurve',
    0x0122: 'GrayResponseUnit',
    0x013C: 'HostComputer',
    0x010E: 'ImageDescription',
    0x0101: 'ImageLength',
    0x0100: 'ImageWidth',
    0x010F: 'Make',
    0x0119: 'MaxSampleValue',
    0x0118: 'MinSampleValue',
    0x0110: 'Model',
    0x00FE: 'NewSubfileType',
    0x0112: 'Orientation',
    0x0106: 'PhotometricInterpretation',
    0x011C: 'PlanarConfiguration',
    0x0128: 'ResolutionUnit',
    0x0116: 'RowsPerStrip',
    0x0115: 'SamplesPerPixel',
    0x0131: 'Software',
    0x0117: 'StripByteCounts',
    0x0111: 'StripOffsets',
    0x00FF: 'SubfileType',
    0x0107: 'Threshholding',
    0x011A: 'XResolution',
    0x011B: 'YResolution',
    // TIFF Extended
    0x0146: 'BadFaxLines',
    0x0147: 'CleanFaxData',
    0x0157: 'ClipPath',
    0x0148: 'ConsecutiveBadFaxLines',
    0x01B1: 'Decode',
    0x01B2: 'DefaultImageColor',
    0x010D: 'DocumentName',
    0x0150: 'DotRange',
    0x0141: 'HalftoneHints',
    0x015A: 'Indexed',
    0x015B: 'JPEGTables',
    0x011D: 'PageName',
    0x0129: 'PageNumber',
    0x013D: 'Predictor',
    0x013F: 'PrimaryChromaticities',
    0x0214: 'ReferenceBlackWhite',
    0x0153: 'SampleFormat',
    0x022F: 'StripRowCounts',
    0x014A: 'SubIFDs',
    0x0124: 'T4Options',
    0x0125: 'T6Options',
    0x0145: 'TileByteCounts',
    0x0143: 'TileLength',
    0x0144: 'TileOffsets',
    0x0142: 'TileWidth',
    0x012D: 'TransferFunction',
    0x013E: 'WhitePoint',
    0x0158: 'XClipPathUnits',
    0x011E: 'XPosition',
    0x0211: 'YCbCrCoefficients',
    0x0213: 'YCbCrPositioning',
    0x0212: 'YCbCrSubSampling',
    0x0159: 'YClipPathUnits',
    0x011F: 'YPosition',
    // EXIF
    0x9202: 'ApertureValue',
    0xA001: 'ColorSpace',
    0x9004: 'DateTimeDigitized',
    0x9003: 'DateTimeOriginal',
    0x8769: 'Exif IFD',
    0x9000: 'ExifVersion',
    0x829A: 'ExposureTime',
    0xA300: 'FileSource',
    0x9209: 'Flash',
    0xA000: 'FlashpixVersion',
    0x829D: 'FNumber',
    0xA420: 'ImageUniqueID',
    0x9208: 'LightSource',
    0x927C: 'MakerNote',
    0x9201: 'ShutterSpeedValue',
    0x9286: 'UserComment',
    // IPTC
    0x83BB: 'IPTC',
    // ICC
    0x8773: 'ICC Profile',
    // XMP
    0x02BC: 'XMP',
    // GDAL
    0xA480: 'GDAL_METADATA',
    0xA481: 'GDAL_NODATA',
    // Photoshop
    0x8649: 'Photoshop'
  },
  fieldTypeNames: {
    0x0001: 'BYTE',
    0x0002: 'ASCII',
    0x0003: 'SHORT',
    0x0004: 'LONG',
    0x0005: 'RATIONAL',
    0x0006: 'SBYTE',
    0x0007: 'UNDEFINED',
    0x0008: 'SSHORT',
    0x0009: 'SLONG',
    0x000A: 'SRATIONAL',
    0x000B: 'FLOAT',
    0x000C: 'DOUBLE'
  }
};
module.exports = tiffReader;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHBhcnRpY2xlXFxDQ1RJRkZSZWFkZXIuanMiXSwibmFtZXMiOlsiZGVidWciLCJyZXF1aXJlIiwidGlmZlJlYWRlciIsIl9saXR0bGVFbmRpYW4iLCJfdGlmZkRhdGEiLCJfZmlsZURpcmVjdG9yaWVzIiwiZ2V0VWludDgiLCJvZmZzZXQiLCJnZXRVaW50MTYiLCJnZXRVaW50MzIiLCJhIiwiY2hlY2tMaXR0bGVFbmRpYW4iLCJCT00iLCJsaXR0bGVFbmRpYW4iLCJjb25zb2xlIiwibG9nIiwiVHlwZUVycm9yIiwiZ2V0RXJyb3IiLCJoYXNUb3dlbCIsIlJhbmdlRXJyb3IiLCJnZXRGaWVsZFR5cGVOYW1lIiwiZmllbGRUeXBlIiwidHlwZU5hbWVzIiwiZmllbGRUeXBlTmFtZXMiLCJnZXRGaWVsZFRhZ05hbWUiLCJmaWVsZFRhZyIsInRhZ05hbWVzIiwiZmllbGRUYWdOYW1lcyIsImNjIiwibG9nSUQiLCJnZXRGaWVsZFR5cGVMZW5ndGgiLCJmaWVsZFR5cGVOYW1lIiwiaW5kZXhPZiIsImdldEZpZWxkVmFsdWVzIiwiZmllbGRUYWdOYW1lIiwidHlwZUNvdW50IiwidmFsdWVPZmZzZXQiLCJmaWVsZFZhbHVlcyIsImZpZWxkVHlwZUxlbmd0aCIsImZpZWxkVmFsdWVTaXplIiwicHVzaCIsImkiLCJpbmRleE9mZnNldCIsImdldEJ5dGVzIiwiZm9yRWFjaCIsImUiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJudW1CeXRlcyIsImdldEJpdHMiLCJudW1CaXRzIiwiYnl0ZU9mZnNldCIsImJpdE9mZnNldCIsImV4dHJhQnl0ZXMiLCJNYXRoIiwiZmxvb3IiLCJuZXdCeXRlT2Zmc2V0IiwidG90YWxCaXRzIiwic2hpZnRSaWdodCIsInNoaWZ0TGVmdCIsInJhd0JpdHMiLCJwYXJzZUZpbGVEaXJlY3RvcnkiLCJudW1EaXJFbnRyaWVzIiwidGlmZkZpZWxkcyIsImVudHJ5Q291bnQiLCJ0eXBlIiwidmFsdWVzIiwibmV4dElGREJ5dGVPZmZzZXQiLCJjbGFtcENvbG9yU2FtcGxlIiwiY29sb3JTYW1wbGUiLCJiaXRzUGVyU2FtcGxlIiwibXVsdGlwbGllciIsInBvdyIsInBhcnNlVElGRiIsInRpZmZEYXRhIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlyc3RJRkRCeXRlT2Zmc2V0IiwibGVuZ3RoIiwiZmlsZURpcmVjdG9yeSIsImltYWdlV2lkdGgiLCJpbWFnZUxlbmd0aCIsIndpZHRoIiwiaGVpZ2h0Iiwic3RyaXBzIiwiY29tcHJlc3Npb24iLCJzYW1wbGVzUGVyUGl4ZWwiLCJzYW1wbGVQcm9wZXJ0aWVzIiwiYml0c1BlclBpeGVsIiwiaGFzQnl0ZXNQZXJQaXhlbCIsImJpdHNQZXJTYW1wbGVWYWx1ZXMiLCJoYXNCeXRlc1BlclNhbXBsZSIsImJ5dGVzUGVyU2FtcGxlIiwidW5kZWZpbmVkIiwiYnl0ZXNQZXJQaXhlbCIsInN0cmlwT2Zmc2V0VmFsdWVzIiwibnVtU3RyaXBPZmZzZXRWYWx1ZXMiLCJzdHJpcEJ5dGVDb3VudFZhbHVlcyIsImNlaWwiLCJFcnJvciIsInN0cmlwT2Zmc2V0Iiwic3RyaXBCeXRlQ291bnQiLCJqSW5jcmVtZW50IiwiZ2V0SGVhZGVyIiwicGl4ZWwiLCJzYW1wbGUiLCJjdXJyZW50U2FtcGxlIiwibSIsInNhbXBsZU9mZnNldCIsInNhbXBsZUluZm8iLCJiaXRzIiwiYmxvY2tMZW5ndGgiLCJpdGVyYXRpb25zIiwiaGVhZGVyIiwiZ2V0SW50OCIsImN1cnJlbnRCeXRlIiwiZ2V0Q29udGV4dCIsImN0eCIsImZpbGxTdHlsZSIsInJvd3NQZXJTdHJpcCIsIm51bVN0cmlwcyIsImltYWdlTGVuZ3RoTW9kUm93c1BlclN0cmlwIiwicm93c0luTGFzdFN0cmlwIiwibnVtUm93c0luU3RyaXAiLCJudW1Sb3dzSW5QcmV2aW91c1N0cmlwIiwicGhvdG9tZXRyaWNJbnRlcnByZXRhdGlvbiIsImV4dHJhU2FtcGxlc1ZhbHVlcyIsIm51bUV4dHJhU2FtcGxlcyIsImNvbG9yTWFwVmFsdWVzIiwiY29sb3JNYXBTYW1wbGVTaXplIiwibnVtUGl4ZWxzIiwieVBhZGRpbmciLCJ5IiwiaiIsIngiLCJwaXhlbFNhbXBsZXMiLCJyZWQiLCJncmVlbiIsImJsdWUiLCJvcGFjaXR5IiwiayIsImludmVydFZhbHVlIiwiaW5kZXgiLCJzYW1wbGVzIiwiY29sb3JNYXBJbmRleCIsImZpbGxSZWN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLGlCQUFELENBQXJCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUMsVUFBVTtBQUFHO0FBQXlCO0FBQ3RDQyxFQUFBQSxhQUFhLEVBQUUsS0FEdUI7QUFFdENDLEVBQUFBLFNBQVMsRUFBRSxJQUYyQjtBQUd0Q0MsRUFBQUEsZ0JBQWdCLEVBQUUsRUFIb0I7QUFLdENDLEVBQUFBLFFBQVEsRUFBRSxrQkFBVUMsTUFBVixFQUFrQjtBQUN4QixXQUFPLEtBQUtILFNBQUwsQ0FBZUcsTUFBZixDQUFQO0FBQ0gsR0FQcUM7QUFTdENDLEVBQUFBLFNBQVMsRUFBRSxtQkFBVUQsTUFBVixFQUFrQjtBQUN6QixRQUFJLEtBQUtKLGFBQVQsRUFDSSxPQUFRLEtBQUtDLFNBQUwsQ0FBZUcsTUFBTSxHQUFHLENBQXhCLEtBQThCLENBQS9CLEdBQXFDLEtBQUtILFNBQUwsQ0FBZUcsTUFBZixDQUE1QyxDQURKLEtBR0ksT0FBUSxLQUFLSCxTQUFMLENBQWVHLE1BQWYsS0FBMEIsQ0FBM0IsR0FBaUMsS0FBS0gsU0FBTCxDQUFlRyxNQUFNLEdBQUcsQ0FBeEIsQ0FBeEM7QUFD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WCxZQUFRLGtCQXRFRztBQXVFWCxZQUFRLGtCQXZFRztBQXdFWCxZQUFRLGdCQXhFRztBQXlFWCxZQUFRLFdBekVHO0FBMkVYO0FBQ0EsWUFBUSxlQTVFRztBQTZFWCxZQUFRLFlBN0VHO0FBOEVYLFlBQVEsbUJBOUVHO0FBK0VYLFlBQVEsa0JBL0VHO0FBZ0ZYLFlBQVEsVUFoRkc7QUFpRlgsWUFBUSxhQWpGRztBQWtGWCxZQUFRLGNBbEZHO0FBbUZYLFlBQVEsWUFuRkc7QUFvRlgsWUFBUSxPQXBGRztBQXFGWCxZQUFRLGlCQXJGRztBQXNGWCxZQUFRLFNBdEZHO0FBdUZYLFlBQVEsZUF2Rkc7QUF3RlgsWUFBUSxhQXhGRztBQXlGWCxZQUFRLFdBekZHO0FBMEZYLFlBQVEsbUJBMUZHO0FBMkZYLFlBQVEsYUEzRkc7QUE2Rlg7QUFDQSxZQUFRLE1BOUZHO0FBZ0dYO0FBQ0EsWUFBUSxhQWpHRztBQW1HWDtBQUNBLFlBQVEsS0FwR0c7QUFzR1g7QUFDQSxZQUFRLGVBdkdHO0FBd0dYLFlBQVEsYUF4R0c7QUEwR1g7QUFDQSxZQUFRO0FBM0dHLEdBcmhCdUI7QUFtb0J0Q0osRUFBQUEsY0FBYyxFQUFFO0FBQ1osWUFBUSxNQURJO0FBRVosWUFBUSxPQUZJO0FBR1osWUFBUSxPQUhJO0FBSVosWUFBUSxNQUpJO0FBS1osWUFBUSxVQUxJO0FBTVosWUFBUSxPQU5JO0FBT1osWUFBUSxXQVBJO0FBUVosWUFBUSxRQVJJO0FBU1osWUFBUSxPQVRJO0FBVVosWUFBUSxXQVZJO0FBV1osWUFBUSxPQVhJO0FBWVosWUFBUTtBQVpJO0FBbm9Cc0IsQ0FBMUM7QUFtcEJBNEgsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEosVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDExIEdvcmRvbiBQLiBIZW1zbGV5XHJcbiBodHRwOi8vZ3BoZW1zbGV5Lm9yZy9cclxuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcclxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4uL2NvcmUvQ0NEZWJ1ZycpO1xyXG5cclxuLyoqXHJcbiAqIGNjLnRpZmZSZWFkZXIgaXMgYSBzaW5nbGV0b24gb2JqZWN0LCBpdCdzIGEgdGlmZiBmaWxlIHJlYWRlciwgaXQgY2FuIHBhcnNlIGJ5dGUgYXJyYXkgdG8gZHJhdyBpbnRvIGEgY2FudmFzXHJcbiAqIEBjbGFzc1xyXG4gKiBAbmFtZSB0aWZmUmVhZGVyXHJcbiAqL1xyXG52YXIgdGlmZlJlYWRlciA9IC8qKiBAbGVuZHMgdGlmZlJlYWRlciMgKi97XHJcbiAgICBfbGl0dGxlRW5kaWFuOiBmYWxzZSxcclxuICAgIF90aWZmRGF0YTogbnVsbCxcclxuICAgIF9maWxlRGlyZWN0b3JpZXM6IFtdLFxyXG5cclxuICAgIGdldFVpbnQ4OiBmdW5jdGlvbiAob2Zmc2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpZmZEYXRhW29mZnNldF07XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFVpbnQxNjogZnVuY3Rpb24gKG9mZnNldCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9saXR0bGVFbmRpYW4pXHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fdGlmZkRhdGFbb2Zmc2V0ICsgMV0gPDwgOCkgfCAodGhpcy5fdGlmZkRhdGFbb2Zmc2V0XSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX3RpZmZEYXRhW29mZnNldF0gPDwgOCkgfCAodGhpcy5fdGlmZkRhdGFbb2Zmc2V0ICsgMV0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRVaW50MzI6IGZ1bmN0aW9uIChvZmZzZXQpIHtcclxuICAgICAgICB2YXIgYSA9IHRoaXMuX3RpZmZEYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLl9saXR0bGVFbmRpYW4pXHJcbiAgICAgICAgICAgIHJldHVybiAoYVtvZmZzZXQgKyAzXSA8PCAyNCkgfCAoYVtvZmZzZXQgKyAyXSA8PCAxNikgfCAoYVtvZmZzZXQgKyAxXSA8PCA4KSB8IChhW29mZnNldF0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIChhW29mZnNldF0gPDwgMjQpIHwgKGFbb2Zmc2V0ICsgMV0gPDwgMTYpIHwgKGFbb2Zmc2V0ICsgMl0gPDwgOCkgfCAoYVtvZmZzZXQgKyAzXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrTGl0dGxlRW5kaWFuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIEJPTSA9IHRoaXMuZ2V0VWludDE2KDApO1xyXG5cclxuICAgICAgICBpZiAoQk9NID09PSAweDQ5NDkpIHtcclxuICAgICAgICAgICAgdGhpcy5saXR0bGVFbmRpYW4gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoQk9NID09PSAweDRENEQpIHtcclxuICAgICAgICAgICAgdGhpcy5saXR0bGVFbmRpYW4gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhCT00pO1xyXG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoZGVidWcuZ2V0RXJyb3IoNjAxOSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGl0dGxlRW5kaWFuO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYXNUb3dlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIENoZWNrIGZvciB0b3dlbC5cclxuICAgICAgICBpZiAodGhpcy5nZXRVaW50MTYoMikgIT09IDQyKSB7XHJcbiAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoZGVidWcuZ2V0RXJyb3IoNjAyMCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RmllbGRUeXBlTmFtZTogZnVuY3Rpb24gKGZpZWxkVHlwZSkge1xyXG4gICAgICAgIHZhciB0eXBlTmFtZXMgPSB0aGlzLmZpZWxkVHlwZU5hbWVzO1xyXG4gICAgICAgIGlmIChmaWVsZFR5cGUgaW4gdHlwZU5hbWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlTmFtZXNbZmllbGRUeXBlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEZpZWxkVGFnTmFtZTogZnVuY3Rpb24gKGZpZWxkVGFnKSB7XHJcbiAgICAgICAgdmFyIHRhZ05hbWVzID0gdGhpcy5maWVsZFRhZ05hbWVzO1xyXG5cclxuICAgICAgICBpZiAoZmllbGRUYWcgaW4gdGFnTmFtZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhZ05hbWVzW2ZpZWxkVGFnXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5sb2dJRCg2MDIxLCBmaWVsZFRhZyk7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlRhZ1wiICsgZmllbGRUYWc7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRGaWVsZFR5cGVMZW5ndGg6IGZ1bmN0aW9uIChmaWVsZFR5cGVOYW1lKSB7XHJcbiAgICAgICAgaWYgKFsnQllURScsICdBU0NJSScsICdTQllURScsICdVTkRFRklORUQnXS5pbmRleE9mKGZpZWxkVHlwZU5hbWUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKFsnU0hPUlQnLCAnU1NIT1JUJ10uaW5kZXhPZihmaWVsZFR5cGVOYW1lKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChbJ0xPTkcnLCAnU0xPTkcnLCAnRkxPQVQnXS5pbmRleE9mKGZpZWxkVHlwZU5hbWUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gNDtcclxuICAgICAgICB9IGVsc2UgaWYgKFsnUkFUSU9OQUwnLCAnU1JBVElPTkFMJywgJ0RPVUJMRSddLmluZGV4T2YoZmllbGRUeXBlTmFtZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RmllbGRWYWx1ZXM6IGZ1bmN0aW9uIChmaWVsZFRhZ05hbWUsIGZpZWxkVHlwZU5hbWUsIHR5cGVDb3VudCwgdmFsdWVPZmZzZXQpIHtcclxuICAgICAgICB2YXIgZmllbGRWYWx1ZXMgPSBbXTtcclxuICAgICAgICB2YXIgZmllbGRUeXBlTGVuZ3RoID0gdGhpcy5nZXRGaWVsZFR5cGVMZW5ndGgoZmllbGRUeXBlTmFtZSk7XHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWVTaXplID0gZmllbGRUeXBlTGVuZ3RoICogdHlwZUNvdW50O1xyXG5cclxuICAgICAgICBpZiAoZmllbGRWYWx1ZVNpemUgPD0gNCkge1xyXG4gICAgICAgICAgICAvLyBUaGUgdmFsdWUgaXMgc3RvcmVkIGF0IHRoZSBiaWcgZW5kIG9mIHRoZSB2YWx1ZU9mZnNldC5cclxuICAgICAgICAgICAgaWYgKHRoaXMubGl0dGxlRW5kaWFuID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWVzLnB1c2godmFsdWVPZmZzZXQgPj4+ICgoNCAtIGZpZWxkVHlwZUxlbmd0aCkgKiA4KSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWVzLnB1c2godmFsdWVPZmZzZXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZUNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleE9mZnNldCA9IGZpZWxkVHlwZUxlbmd0aCAqIGk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRUeXBlTGVuZ3RoID49IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoWydSQVRJT05BTCcsICdTUkFUSU9OQUwnXS5pbmRleE9mKGZpZWxkVHlwZU5hbWUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOdW1lcmF0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZXMucHVzaCh0aGlzLmdldFVpbnQzMih2YWx1ZU9mZnNldCArIGluZGV4T2Zmc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlbm9taW5hdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsdWVzLnB1c2godGhpcy5nZXRVaW50MzIodmFsdWVPZmZzZXQgKyBpbmRleE9mZnNldCArIDQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2dJRCg4MDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsdWVzLnB1c2godGhpcy5nZXRCeXRlcyhmaWVsZFR5cGVMZW5ndGgsIHZhbHVlT2Zmc2V0ICsgaW5kZXhPZmZzZXQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZpZWxkVHlwZU5hbWUgPT09ICdBU0NJSScpIHtcclxuICAgICAgICAgICAgZmllbGRWYWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAoZSwgaSwgYSkge1xyXG4gICAgICAgICAgICAgICAgYVtpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmllbGRWYWx1ZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEJ5dGVzOiBmdW5jdGlvbiAobnVtQnl0ZXMsIG9mZnNldCkge1xyXG4gICAgICAgIGlmIChudW1CeXRlcyA8PSAwKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZ0lEKDgwMDEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtQnl0ZXMgPD0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVaW50OChvZmZzZXQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtQnl0ZXMgPD0gMikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVaW50MTYob2Zmc2V0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKG51bUJ5dGVzIDw9IDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VWludDMyKG9mZnNldCkgPj4+IDg7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW1CeXRlcyA8PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFVpbnQzMihvZmZzZXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmxvZ0lEKDgwMDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Qml0czogZnVuY3Rpb24gKG51bUJpdHMsIGJ5dGVPZmZzZXQsIGJpdE9mZnNldCkge1xyXG4gICAgICAgIGJpdE9mZnNldCA9IGJpdE9mZnNldCB8fCAwO1xyXG4gICAgICAgIHZhciBleHRyYUJ5dGVzID0gTWF0aC5mbG9vcihiaXRPZmZzZXQgLyA4KTtcclxuICAgICAgICB2YXIgbmV3Qnl0ZU9mZnNldCA9IGJ5dGVPZmZzZXQgKyBleHRyYUJ5dGVzO1xyXG4gICAgICAgIHZhciB0b3RhbEJpdHMgPSBiaXRPZmZzZXQgKyBudW1CaXRzO1xyXG4gICAgICAgIHZhciBzaGlmdFJpZ2h0ID0gMzIgLSBudW1CaXRzO1xyXG4gICAgICAgIHZhciBzaGlmdExlZnQscmF3Qml0cztcclxuXHJcbiAgICAgICAgaWYgKHRvdGFsQml0cyA8PSAwKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZ0lEKDYwMjMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodG90YWxCaXRzIDw9IDgpIHtcclxuICAgICAgICAgICAgc2hpZnRMZWZ0ID0gMjQgKyBiaXRPZmZzZXQ7XHJcbiAgICAgICAgICAgIHJhd0JpdHMgPSB0aGlzLmdldFVpbnQ4KG5ld0J5dGVPZmZzZXQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodG90YWxCaXRzIDw9IDE2KSB7XHJcbiAgICAgICAgICAgIHNoaWZ0TGVmdCA9IDE2ICsgYml0T2Zmc2V0O1xyXG4gICAgICAgICAgICByYXdCaXRzID0gdGhpcy5nZXRVaW50MTYobmV3Qnl0ZU9mZnNldCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3RhbEJpdHMgPD0gMzIpIHtcclxuICAgICAgICAgICAgc2hpZnRMZWZ0ID0gYml0T2Zmc2V0O1xyXG4gICAgICAgICAgICByYXdCaXRzID0gdGhpcy5nZXRVaW50MzIobmV3Qnl0ZU9mZnNldCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MubG9nSUQoNjAyMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnYml0cyc6ICgocmF3Qml0cyA8PCBzaGlmdExlZnQpID4+PiBzaGlmdFJpZ2h0KSxcclxuICAgICAgICAgICAgJ2J5dGVPZmZzZXQnOiBuZXdCeXRlT2Zmc2V0ICsgTWF0aC5mbG9vcih0b3RhbEJpdHMgLyA4KSxcclxuICAgICAgICAgICAgJ2JpdE9mZnNldCc6IHRvdGFsQml0cyAlIDhcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBwYXJzZUZpbGVEaXJlY3Rvcnk6IGZ1bmN0aW9uIChieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIG51bURpckVudHJpZXMgPSB0aGlzLmdldFVpbnQxNihieXRlT2Zmc2V0KTtcclxuICAgICAgICB2YXIgdGlmZkZpZWxkcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gYnl0ZU9mZnNldCArIDIsIGVudHJ5Q291bnQgPSAwOyBlbnRyeUNvdW50IDwgbnVtRGlyRW50cmllczsgaSArPSAxMiwgZW50cnlDb3VudCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBmaWVsZFRhZyA9IHRoaXMuZ2V0VWludDE2KGkpO1xyXG4gICAgICAgICAgICB2YXIgZmllbGRUeXBlID0gdGhpcy5nZXRVaW50MTYoaSArIDIpO1xyXG4gICAgICAgICAgICB2YXIgdHlwZUNvdW50ID0gdGhpcy5nZXRVaW50MzIoaSArIDQpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVPZmZzZXQgPSB0aGlzLmdldFVpbnQzMihpICsgOCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmllbGRUYWdOYW1lID0gdGhpcy5nZXRGaWVsZFRhZ05hbWUoZmllbGRUYWcpO1xyXG4gICAgICAgICAgICB2YXIgZmllbGRUeXBlTmFtZSA9IHRoaXMuZ2V0RmllbGRUeXBlTmFtZShmaWVsZFR5cGUpO1xyXG4gICAgICAgICAgICB2YXIgZmllbGRWYWx1ZXMgPSB0aGlzLmdldEZpZWxkVmFsdWVzKGZpZWxkVGFnTmFtZSwgZmllbGRUeXBlTmFtZSwgdHlwZUNvdW50LCB2YWx1ZU9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICB0aWZmRmllbGRzW2ZpZWxkVGFnTmFtZV0gPSB7IHR5cGU6IGZpZWxkVHlwZU5hbWUsIHZhbHVlczogZmllbGRWYWx1ZXMgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2ZpbGVEaXJlY3Rvcmllcy5wdXNoKHRpZmZGaWVsZHMpO1xyXG5cclxuICAgICAgICB2YXIgbmV4dElGREJ5dGVPZmZzZXQgPSB0aGlzLmdldFVpbnQzMihpKTtcclxuICAgICAgICBpZiAobmV4dElGREJ5dGVPZmZzZXQgIT09IDB4MDAwMDAwMDApIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJzZUZpbGVEaXJlY3RvcnkobmV4dElGREJ5dGVPZmZzZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xhbXBDb2xvclNhbXBsZTogZnVuY3Rpb24oY29sb3JTYW1wbGUsIGJpdHNQZXJTYW1wbGUpIHtcclxuICAgICAgICB2YXIgbXVsdGlwbGllciA9IE1hdGgucG93KDIsIDggLSBiaXRzUGVyU2FtcGxlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGNvbG9yU2FtcGxlICogbXVsdGlwbGllcikgKyAobXVsdGlwbGllciAtIDEpKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRpZmZEYXRhXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBwYXJzZVRJRkY6IGZ1bmN0aW9uICh0aWZmRGF0YSwgY2FudmFzKSB7XHJcbiAgICAgICAgY2FudmFzID0gY2FudmFzIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5cclxuICAgICAgICB0aGlzLl90aWZmRGF0YSA9IHRpZmZEYXRhO1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cclxuICAgICAgICB0aGlzLmNoZWNrTGl0dGxlRW5kaWFuKCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5oYXNUb3dlbCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBmaXJzdElGREJ5dGVPZmZzZXQgPSB0aGlzLmdldFVpbnQzMig0KTtcclxuXHJcbiAgICAgICAgdGhpcy5fZmlsZURpcmVjdG9yaWVzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJzZUZpbGVEaXJlY3RvcnkoZmlyc3RJRkRCeXRlT2Zmc2V0KTtcclxuXHJcbiAgICAgICAgdmFyIGZpbGVEaXJlY3RvcnkgPSB0aGlzLl9maWxlRGlyZWN0b3JpZXNbMF07XHJcblxyXG4gICAgICAgIHZhciBpbWFnZVdpZHRoID0gZmlsZURpcmVjdG9yeVsnSW1hZ2VXaWR0aCddLnZhbHVlc1swXTtcclxuICAgICAgICB2YXIgaW1hZ2VMZW5ndGggPSBmaWxlRGlyZWN0b3J5WydJbWFnZUxlbmd0aCddLnZhbHVlc1swXTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSBpbWFnZVdpZHRoO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGltYWdlTGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgc3RyaXBzID0gW107XHJcblxyXG4gICAgICAgIHZhciBjb21wcmVzc2lvbiA9IChmaWxlRGlyZWN0b3J5WydDb21wcmVzc2lvbiddKSA/IGZpbGVEaXJlY3RvcnlbJ0NvbXByZXNzaW9uJ10udmFsdWVzWzBdIDogMTtcclxuXHJcbiAgICAgICAgdmFyIHNhbXBsZXNQZXJQaXhlbCA9IGZpbGVEaXJlY3RvcnlbJ1NhbXBsZXNQZXJQaXhlbCddLnZhbHVlc1swXTtcclxuXHJcbiAgICAgICAgdmFyIHNhbXBsZVByb3BlcnRpZXMgPSBbXTtcclxuXHJcbiAgICAgICAgdmFyIGJpdHNQZXJQaXhlbCA9IDA7XHJcbiAgICAgICAgdmFyIGhhc0J5dGVzUGVyUGl4ZWwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZmlsZURpcmVjdG9yeVsnQml0c1BlclNhbXBsZSddLnZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uIChiaXRzUGVyU2FtcGxlLCBpLCBiaXRzUGVyU2FtcGxlVmFsdWVzKSB7XHJcbiAgICAgICAgICAgIHNhbXBsZVByb3BlcnRpZXNbaV0gPSB7XHJcbiAgICAgICAgICAgICAgICBiaXRzUGVyU2FtcGxlOiBiaXRzUGVyU2FtcGxlLFxyXG4gICAgICAgICAgICAgICAgaGFzQnl0ZXNQZXJTYW1wbGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYnl0ZXNQZXJTYW1wbGU6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKChiaXRzUGVyU2FtcGxlICUgOCkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHNhbXBsZVByb3BlcnRpZXNbaV0uaGFzQnl0ZXNQZXJTYW1wbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlUHJvcGVydGllc1tpXS5ieXRlc1BlclNhbXBsZSA9IGJpdHNQZXJTYW1wbGUgLyA4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBiaXRzUGVyUGl4ZWwgKz0gYml0c1BlclNhbXBsZTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKChiaXRzUGVyUGl4ZWwgJSA4KSA9PT0gMCkge1xyXG4gICAgICAgICAgICBoYXNCeXRlc1BlclBpeGVsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGJ5dGVzUGVyUGl4ZWwgPSBiaXRzUGVyUGl4ZWwgLyA4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHN0cmlwT2Zmc2V0VmFsdWVzID0gZmlsZURpcmVjdG9yeVsnU3RyaXBPZmZzZXRzJ10udmFsdWVzO1xyXG4gICAgICAgIHZhciBudW1TdHJpcE9mZnNldFZhbHVlcyA9IHN0cmlwT2Zmc2V0VmFsdWVzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gU3RyaXBCeXRlQ291bnRzIGlzIHN1cHBvc2VkIHRvIGJlIHJlcXVpcmVkLCBidXQgc2VlIGlmIHdlIGNhbiByZWNvdmVyIGFueXdheS5cclxuICAgICAgICBpZiAoZmlsZURpcmVjdG9yeVsnU3RyaXBCeXRlQ291bnRzJ10pIHtcclxuICAgICAgICAgICAgdmFyIHN0cmlwQnl0ZUNvdW50VmFsdWVzID0gZmlsZURpcmVjdG9yeVsnU3RyaXBCeXRlQ291bnRzJ10udmFsdWVzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmxvZ0lEKDgwMDMpO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5mZXIgU3RyaXBCeXRlQ291bnRzLCBpZiBwb3NzaWJsZS5cclxuICAgICAgICAgICAgaWYgKG51bVN0cmlwT2Zmc2V0VmFsdWVzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaXBCeXRlQ291bnRWYWx1ZXMgPSBbTWF0aC5jZWlsKChpbWFnZVdpZHRoICogaW1hZ2VMZW5ndGggKiBiaXRzUGVyUGl4ZWwpIC8gOCldO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoZGVidWcuZ2V0RXJyb3IoNjAyNCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBMb29wIHRocm91Z2ggc3RyaXBzIGFuZCBkZWNvbXByZXNzIGFzIG5lY2Vzc2FyeS5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVN0cmlwT2Zmc2V0VmFsdWVzOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHN0cmlwT2Zmc2V0ID0gc3RyaXBPZmZzZXRWYWx1ZXNbaV07XHJcbiAgICAgICAgICAgIHN0cmlwc1tpXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0cmlwQnl0ZUNvdW50ID0gc3RyaXBCeXRlQ291bnRWYWx1ZXNbaV07XHJcblxyXG4gICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggcGl4ZWxzLlxyXG4gICAgICAgICAgICBmb3IgKHZhciBieXRlT2Zmc2V0ID0gMCwgYml0T2Zmc2V0ID0gMCwgakluY3JlbWVudCA9IDEsIGdldEhlYWRlciA9IHRydWUsIHBpeGVsID0gW10sIG51bUJ5dGVzID0gMCwgc2FtcGxlID0gMCwgY3VycmVudFNhbXBsZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA8IHN0cmlwQnl0ZUNvdW50OyBieXRlT2Zmc2V0ICs9IGpJbmNyZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIERlY29tcHJlc3Mgc3RyaXAuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbXByZXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5jb21wcmVzc2VkXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggc2FtcGxlcyAoc3ViLXBpeGVscykuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG0gPSAwLCBwaXhlbCA9IFtdOyBtIDwgc2FtcGxlc1BlclBpeGVsOyBtKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYW1wbGVQcm9wZXJ0aWVzW21dLmhhc0J5dGVzUGVyU2FtcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWFhYOiBUaGlzIGlzIHdyb25nIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzYW1wbGVPZmZzZXQgPSBzYW1wbGVQcm9wZXJ0aWVzW21dLmJ5dGVzUGVyU2FtcGxlICogbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXhlbC5wdXNoKHRoaXMuZ2V0Qnl0ZXMoc2FtcGxlUHJvcGVydGllc1ttXS5ieXRlc1BlclNhbXBsZSwgc3RyaXBPZmZzZXQgKyBieXRlT2Zmc2V0ICsgc2FtcGxlT2Zmc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzYW1wbGVJbmZvID0gdGhpcy5nZXRCaXRzKHNhbXBsZVByb3BlcnRpZXNbbV0uYml0c1BlclNhbXBsZSwgc3RyaXBPZmZzZXQgKyBieXRlT2Zmc2V0LCBiaXRPZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsLnB1c2goc2FtcGxlSW5mby5iaXRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieXRlT2Zmc2V0ID0gc2FtcGxlSW5mby5ieXRlT2Zmc2V0IC0gc3RyaXBPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0T2Zmc2V0ID0gc2FtcGxlSW5mby5iaXRPZmZzZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoZGVidWcuZ2V0RXJyb3IoNjAyNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpcHNbaV0ucHVzaChwaXhlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzQnl0ZXNQZXJQaXhlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgakluY3JlbWVudCA9IGJ5dGVzUGVyUGl4ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqSW5jcmVtZW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoZGVidWcuZ2V0RXJyb3IoNjAyNikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDSVRUIEdyb3VwIDMgMS1EaW1lbnNpb25hbCBNb2RpZmllZCBIdWZmbWFuIHJ1bi1sZW5ndGggZW5jb2RpbmdcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhYWDogVXNlIFBERi5qcyBjb2RlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR3JvdXAgMyBGYXhcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhYWDogVXNlIFBERi5qcyBjb2RlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR3JvdXAgNCBGYXhcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhYWDogVXNlIFBERi5qcyBjb2RlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTFpXXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBYWFg6IFVzZSBQREYuanMgY29kZT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9sZC1zdHlsZSBKUEVHIChUSUZGIDYuMClcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhYWDogVXNlIFBERi5qcyBjb2RlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTmV3LXN0eWxlIEpQRUcgKFRJRkYgU3BlY2lmaWNhdGlvbiBTdXBwbGVtZW50IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBYWFg6IFVzZSBQREYuanMgY29kZT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBhY2tCaXRzXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzMjc3MzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXJlIHdlIHJlYWR5IGZvciBhIG5ldyBibG9jaz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEhlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SGVhZGVyID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJsb2NrTGVuZ3RoID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVyYXRpb25zID0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgaGVhZGVyIGJ5dGUgaXMgc2lnbmVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhlYWRlciA9IHRoaXMuZ2V0SW50OChzdHJpcE9mZnNldCArIGJ5dGVPZmZzZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoaGVhZGVyID49IDApICYmIChoZWFkZXIgPD0gMTI3KSkgeyAvLyBOb3JtYWwgcGl4ZWxzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrTGVuZ3RoID0gaGVhZGVyICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGhlYWRlciA+PSAtMTI3KSAmJiAoaGVhZGVyIDw9IC0xKSkgeyAvLyBDb2xsYXBzZWQgcGl4ZWxzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGlvbnMgPSAtaGVhZGVyICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSAvKmlmIChoZWFkZXIgPT09IC0xMjgpKi8geyAvLyBQbGFjZWhvbGRlciBieXRlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEhlYWRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudEJ5dGUgPSB0aGlzLmdldFVpbnQ4KHN0cmlwT2Zmc2V0ICsgYnl0ZU9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRHVwbGljYXRlIGJ5dGVzLCBpZiBuZWNlc3NhcnkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtID0gMDsgbSA8IGl0ZXJhdGlvbnM7IG0rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYW1wbGVQcm9wZXJ0aWVzW3NhbXBsZV0uaGFzQnl0ZXNQZXJTYW1wbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UncmUgcmVhZGluZyBvbmUgYnl0ZSBhdCBhIHRpbWUsIHNvIHdlIG5lZWQgdG8gaGFuZGxlIG11bHRpLWJ5dGUgc2FtcGxlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNhbXBsZSA9IChjdXJyZW50U2FtcGxlIDw8ICg4ICogbnVtQnl0ZXMpKSB8IGN1cnJlbnRCeXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1CeXRlcysrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXMgb3VyIHNhbXBsZSBjb21wbGV0ZT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bUJ5dGVzID09PSBzYW1wbGVQcm9wZXJ0aWVzW3NhbXBsZV0uYnl0ZXNQZXJTYW1wbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsLnB1c2goY3VycmVudFNhbXBsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2FtcGxlID0gbnVtQnl0ZXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKGRlYnVnLmdldEVycm9yKDYwMjUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElzIG91ciBwaXhlbCBjb21wbGV0ZT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2FtcGxlID09PSBzYW1wbGVzUGVyUGl4ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaXBzW2ldLnB1c2gocGl4ZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXhlbCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYW1wbGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja0xlbmd0aC0tO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElzIG91ciBibG9jayBjb21wbGV0ZT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChibG9ja0xlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEhlYWRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpJbmNyZW1lbnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5rbm93biBjb21wcmVzc2lvbiBhbGdvcml0aG1cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBub3QgYXR0ZW1wdCB0byBwYXJzZSB0aGUgaW1hZ2UgZGF0YS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYW52YXMuZ2V0Q29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IGEgZGVmYXVsdCBmaWxsIHN0eWxlLlxyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDApXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBSb3dzUGVyU3RyaXAgaXMgbWlzc2luZywgdGhlIHdob2xlIGltYWdlIGlzIGluIG9uZSBzdHJpcC5cclxuICAgICAgICAgICAgdmFyIHJvd3NQZXJTdHJpcCA9IGZpbGVEaXJlY3RvcnlbJ1Jvd3NQZXJTdHJpcCddID8gZmlsZURpcmVjdG9yeVsnUm93c1BlclN0cmlwJ10udmFsdWVzWzBdIDogaW1hZ2VMZW5ndGg7XHJcblxyXG4gICAgICAgICAgICB2YXIgbnVtU3RyaXBzID0gc3RyaXBzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpbWFnZUxlbmd0aE1vZFJvd3NQZXJTdHJpcCA9IGltYWdlTGVuZ3RoICUgcm93c1BlclN0cmlwO1xyXG4gICAgICAgICAgICB2YXIgcm93c0luTGFzdFN0cmlwID0gKGltYWdlTGVuZ3RoTW9kUm93c1BlclN0cmlwID09PSAwKSA/IHJvd3NQZXJTdHJpcCA6IGltYWdlTGVuZ3RoTW9kUm93c1BlclN0cmlwO1xyXG5cclxuICAgICAgICAgICAgdmFyIG51bVJvd3NJblN0cmlwID0gcm93c1BlclN0cmlwO1xyXG4gICAgICAgICAgICB2YXIgbnVtUm93c0luUHJldmlvdXNTdHJpcCA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGhvdG9tZXRyaWNJbnRlcnByZXRhdGlvbiA9IGZpbGVEaXJlY3RvcnlbJ1Bob3RvbWV0cmljSW50ZXJwcmV0YXRpb24nXS52YWx1ZXNbMF07XHJcblxyXG4gICAgICAgICAgICB2YXIgZXh0cmFTYW1wbGVzVmFsdWVzID0gW107XHJcbiAgICAgICAgICAgIHZhciBudW1FeHRyYVNhbXBsZXMgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbGVEaXJlY3RvcnlbJ0V4dHJhU2FtcGxlcyddKSB7XHJcbiAgICAgICAgICAgICAgICBleHRyYVNhbXBsZXNWYWx1ZXMgPSBmaWxlRGlyZWN0b3J5WydFeHRyYVNhbXBsZXMnXS52YWx1ZXM7XHJcbiAgICAgICAgICAgICAgICBudW1FeHRyYVNhbXBsZXMgPSBleHRyYVNhbXBsZXNWYWx1ZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlsZURpcmVjdG9yeVsnQ29sb3JNYXAnXSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yTWFwVmFsdWVzID0gZmlsZURpcmVjdG9yeVsnQ29sb3JNYXAnXS52YWx1ZXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3JNYXBTYW1wbGVTaXplID0gTWF0aC5wb3coMiwgc2FtcGxlUHJvcGVydGllc1swXS5iaXRzUGVyU2FtcGxlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBzdHJpcHMgaW4gdGhlIGltYWdlLlxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVN0cmlwczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgbGFzdCBzdHJpcCBtYXkgYmUgc2hvcnQuXHJcbiAgICAgICAgICAgICAgICBpZiAoKGkgKyAxKSA9PT0gbnVtU3RyaXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtUm93c0luU3RyaXAgPSByb3dzSW5MYXN0U3RyaXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG51bVBpeGVscyA9IHN0cmlwc1tpXS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgeVBhZGRpbmcgPSBudW1Sb3dzSW5QcmV2aW91c1N0cmlwICogaTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggdGhlIHJvd3MgaW4gdGhlIHN0cmlwLlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDAsIGogPSAwOyB5IDwgbnVtUm93c0luU3RyaXAsIGogPCBudW1QaXhlbHM7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgcGl4ZWxzIGluIHRoZSByb3cuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBpbWFnZVdpZHRoOyB4KyssIGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGl4ZWxTYW1wbGVzID0gc3RyaXBzW2ldW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmVlbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBibHVlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wYWNpdHkgPSAxLjA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtRXh0cmFTYW1wbGVzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBudW1FeHRyYVNhbXBsZXM7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHRyYVNhbXBsZXNWYWx1ZXNba10gPT09IDEgfHwgZXh0cmFTYW1wbGVzVmFsdWVzW2tdID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsYW1wIG9wYWNpdHkgdG8gdGhlIHJhbmdlIFswLDFdLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5ID0gcGl4ZWxTYW1wbGVzWzMgKyBrXSAvIDI1NjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwaG90b21ldHJpY0ludGVycHJldGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCaWxldmVsIG9yIEdyYXlzY2FsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2hpdGVJc1plcm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2FtcGxlUHJvcGVydGllc1swXS5oYXNCeXRlc1BlclNhbXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW52ZXJ0VmFsdWUgPSBNYXRoLnBvdygweDEwLCBzYW1wbGVQcm9wZXJ0aWVzWzBdLmJ5dGVzUGVyU2FtcGxlICogMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnZlcnQgc2FtcGxlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFNhbXBsZXMuZm9yRWFjaChmdW5jdGlvbiAoc2FtcGxlLCBpbmRleCwgc2FtcGxlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYW1wbGVzW2luZGV4XSA9IGludmVydFZhbHVlIC0gc2FtcGxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJpbGV2ZWwgb3IgR3JheXNjYWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCbGFja0lzWmVyb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZCA9IGdyZWVuID0gYmx1ZSA9IHRoaXMuY2xhbXBDb2xvclNhbXBsZShwaXhlbFNhbXBsZXNbMF0sIHNhbXBsZVByb3BlcnRpZXNbMF0uYml0c1BlclNhbXBsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUkdCIEZ1bGwgQ29sb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWQgPSB0aGlzLmNsYW1wQ29sb3JTYW1wbGUocGl4ZWxTYW1wbGVzWzBdLCBzYW1wbGVQcm9wZXJ0aWVzWzBdLmJpdHNQZXJTYW1wbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyZWVuID0gdGhpcy5jbGFtcENvbG9yU2FtcGxlKHBpeGVsU2FtcGxlc1sxXSwgc2FtcGxlUHJvcGVydGllc1sxXS5iaXRzUGVyU2FtcGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibHVlID0gdGhpcy5jbGFtcENvbG9yU2FtcGxlKHBpeGVsU2FtcGxlc1syXSwgc2FtcGxlUHJvcGVydGllc1syXS5iaXRzUGVyU2FtcGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSR0IgQ29sb3IgUGFsZXR0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xvck1hcFZhbHVlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGRlYnVnLmdldEVycm9yKDYwMjcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xvck1hcEluZGV4ID0gcGl4ZWxTYW1wbGVzWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWQgPSB0aGlzLmNsYW1wQ29sb3JTYW1wbGUoY29sb3JNYXBWYWx1ZXNbY29sb3JNYXBJbmRleF0sIDE2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmVlbiA9IHRoaXMuY2xhbXBDb2xvclNhbXBsZShjb2xvck1hcFZhbHVlc1tjb2xvck1hcFNhbXBsZVNpemUgKyBjb2xvck1hcEluZGV4XSwgMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsdWUgPSB0aGlzLmNsYW1wQ29sb3JTYW1wbGUoY29sb3JNYXBWYWx1ZXNbKDIgKiBjb2xvck1hcFNhbXBsZVNpemUpICsgY29sb3JNYXBJbmRleF0sIDE2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbmtub3duIFBob3RvbWV0cmljIEludGVycHJldGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoZGVidWcuZ2V0RXJyb3IoNjAyOCwgcGhvdG9tZXRyaWNJbnRlcnByZXRhdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKFwiICsgcmVkICsgXCIsIFwiICsgZ3JlZW4gKyBcIiwgXCIgKyBibHVlICsgXCIsIFwiICsgb3BhY2l0eSArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoeCwgeVBhZGRpbmcgKyB5LCAxLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbnVtUm93c0luUHJldmlvdXNTdHJpcCA9IG51bVJvd3NJblN0cmlwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNlZTogaHR0cDovL3d3dy5kaWdpdGl6YXRpb25ndWlkZWxpbmVzLmdvdi9ndWlkZWxpbmVzL1RJRkZfTWV0YWRhdGFfRmluYWwucGRmXHJcbiAgICAvLyBTZWU6IGh0dHA6Ly93d3cuZGlnaXRhbHByZXNlcnZhdGlvbi5nb3YvZm9ybWF0cy9jb250ZW50L3RpZmZfdGFncy5zaHRtbFxyXG4gICAgZmllbGRUYWdOYW1lczoge1xyXG4gICAgICAgIC8vIFRJRkYgQmFzZWxpbmVcclxuICAgICAgICAweDAxM0I6ICdBcnRpc3QnLFxyXG4gICAgICAgIDB4MDEwMjogJ0JpdHNQZXJTYW1wbGUnLFxyXG4gICAgICAgIDB4MDEwOTogJ0NlbGxMZW5ndGgnLFxyXG4gICAgICAgIDB4MDEwODogJ0NlbGxXaWR0aCcsXHJcbiAgICAgICAgMHgwMTQwOiAnQ29sb3JNYXAnLFxyXG4gICAgICAgIDB4MDEwMzogJ0NvbXByZXNzaW9uJyxcclxuICAgICAgICAweDgyOTg6ICdDb3B5cmlnaHQnLFxyXG4gICAgICAgIDB4MDEzMjogJ0RhdGVUaW1lJyxcclxuICAgICAgICAweDAxNTI6ICdFeHRyYVNhbXBsZXMnLFxyXG4gICAgICAgIDB4MDEwQTogJ0ZpbGxPcmRlcicsXHJcbiAgICAgICAgMHgwMTIxOiAnRnJlZUJ5dGVDb3VudHMnLFxyXG4gICAgICAgIDB4MDEyMDogJ0ZyZWVPZmZzZXRzJyxcclxuICAgICAgICAweDAxMjM6ICdHcmF5UmVzcG9uc2VDdXJ2ZScsXHJcbiAgICAgICAgMHgwMTIyOiAnR3JheVJlc3BvbnNlVW5pdCcsXHJcbiAgICAgICAgMHgwMTNDOiAnSG9zdENvbXB1dGVyJyxcclxuICAgICAgICAweDAxMEU6ICdJbWFnZURlc2NyaXB0aW9uJyxcclxuICAgICAgICAweDAxMDE6ICdJbWFnZUxlbmd0aCcsXHJcbiAgICAgICAgMHgwMTAwOiAnSW1hZ2VXaWR0aCcsXHJcbiAgICAgICAgMHgwMTBGOiAnTWFrZScsXHJcbiAgICAgICAgMHgwMTE5OiAnTWF4U2FtcGxlVmFsdWUnLFxyXG4gICAgICAgIDB4MDExODogJ01pblNhbXBsZVZhbHVlJyxcclxuICAgICAgICAweDAxMTA6ICdNb2RlbCcsXHJcbiAgICAgICAgMHgwMEZFOiAnTmV3U3ViZmlsZVR5cGUnLFxyXG4gICAgICAgIDB4MDExMjogJ09yaWVudGF0aW9uJyxcclxuICAgICAgICAweDAxMDY6ICdQaG90b21ldHJpY0ludGVycHJldGF0aW9uJyxcclxuICAgICAgICAweDAxMUM6ICdQbGFuYXJDb25maWd1cmF0aW9uJyxcclxuICAgICAgICAweDAxMjg6ICdSZXNvbHV0aW9uVW5pdCcsXHJcbiAgICAgICAgMHgwMTE2OiAnUm93c1BlclN0cmlwJyxcclxuICAgICAgICAweDAxMTU6ICdTYW1wbGVzUGVyUGl4ZWwnLFxyXG4gICAgICAgIDB4MDEzMTogJ1NvZnR3YXJlJyxcclxuICAgICAgICAweDAxMTc6ICdTdHJpcEJ5dGVDb3VudHMnLFxyXG4gICAgICAgIDB4MDExMTogJ1N0cmlwT2Zmc2V0cycsXHJcbiAgICAgICAgMHgwMEZGOiAnU3ViZmlsZVR5cGUnLFxyXG4gICAgICAgIDB4MDEwNzogJ1RocmVzaGhvbGRpbmcnLFxyXG4gICAgICAgIDB4MDExQTogJ1hSZXNvbHV0aW9uJyxcclxuICAgICAgICAweDAxMUI6ICdZUmVzb2x1dGlvbicsXHJcblxyXG4gICAgICAgIC8vIFRJRkYgRXh0ZW5kZWRcclxuICAgICAgICAweDAxNDY6ICdCYWRGYXhMaW5lcycsXHJcbiAgICAgICAgMHgwMTQ3OiAnQ2xlYW5GYXhEYXRhJyxcclxuICAgICAgICAweDAxNTc6ICdDbGlwUGF0aCcsXHJcbiAgICAgICAgMHgwMTQ4OiAnQ29uc2VjdXRpdmVCYWRGYXhMaW5lcycsXHJcbiAgICAgICAgMHgwMUIxOiAnRGVjb2RlJyxcclxuICAgICAgICAweDAxQjI6ICdEZWZhdWx0SW1hZ2VDb2xvcicsXHJcbiAgICAgICAgMHgwMTBEOiAnRG9jdW1lbnROYW1lJyxcclxuICAgICAgICAweDAxNTA6ICdEb3RSYW5nZScsXHJcbiAgICAgICAgMHgwMTQxOiAnSGFsZnRvbmVIaW50cycsXHJcbiAgICAgICAgMHgwMTVBOiAnSW5kZXhlZCcsXHJcbiAgICAgICAgMHgwMTVCOiAnSlBFR1RhYmxlcycsXHJcbiAgICAgICAgMHgwMTFEOiAnUGFnZU5hbWUnLFxyXG4gICAgICAgIDB4MDEyOTogJ1BhZ2VOdW1iZXInLFxyXG4gICAgICAgIDB4MDEzRDogJ1ByZWRpY3RvcicsXHJcbiAgICAgICAgMHgwMTNGOiAnUHJpbWFyeUNocm9tYXRpY2l0aWVzJyxcclxuICAgICAgICAweDAyMTQ6ICdSZWZlcmVuY2VCbGFja1doaXRlJyxcclxuICAgICAgICAweDAxNTM6ICdTYW1wbGVGb3JtYXQnLFxyXG4gICAgICAgIDB4MDIyRjogJ1N0cmlwUm93Q291bnRzJyxcclxuICAgICAgICAweDAxNEE6ICdTdWJJRkRzJyxcclxuICAgICAgICAweDAxMjQ6ICdUNE9wdGlvbnMnLFxyXG4gICAgICAgIDB4MDEyNTogJ1Q2T3B0aW9ucycsXHJcbiAgICAgICAgMHgwMTQ1OiAnVGlsZUJ5dGVDb3VudHMnLFxyXG4gICAgICAgIDB4MDE0MzogJ1RpbGVMZW5ndGgnLFxyXG4gICAgICAgIDB4MDE0NDogJ1RpbGVPZmZzZXRzJyxcclxuICAgICAgICAweDAxNDI6ICdUaWxlV2lkdGgnLFxyXG4gICAgICAgIDB4MDEyRDogJ1RyYW5zZmVyRnVuY3Rpb24nLFxyXG4gICAgICAgIDB4MDEzRTogJ1doaXRlUG9pbnQnLFxyXG4gICAgICAgIDB4MDE1ODogJ1hDbGlwUGF0aFVuaXRzJyxcclxuICAgICAgICAweDAxMUU6ICdYUG9zaXRpb24nLFxyXG4gICAgICAgIDB4MDIxMTogJ1lDYkNyQ29lZmZpY2llbnRzJyxcclxuICAgICAgICAweDAyMTM6ICdZQ2JDclBvc2l0aW9uaW5nJyxcclxuICAgICAgICAweDAyMTI6ICdZQ2JDclN1YlNhbXBsaW5nJyxcclxuICAgICAgICAweDAxNTk6ICdZQ2xpcFBhdGhVbml0cycsXHJcbiAgICAgICAgMHgwMTFGOiAnWVBvc2l0aW9uJyxcclxuXHJcbiAgICAgICAgLy8gRVhJRlxyXG4gICAgICAgIDB4OTIwMjogJ0FwZXJ0dXJlVmFsdWUnLFxyXG4gICAgICAgIDB4QTAwMTogJ0NvbG9yU3BhY2UnLFxyXG4gICAgICAgIDB4OTAwNDogJ0RhdGVUaW1lRGlnaXRpemVkJyxcclxuICAgICAgICAweDkwMDM6ICdEYXRlVGltZU9yaWdpbmFsJyxcclxuICAgICAgICAweDg3Njk6ICdFeGlmIElGRCcsXHJcbiAgICAgICAgMHg5MDAwOiAnRXhpZlZlcnNpb24nLFxyXG4gICAgICAgIDB4ODI5QTogJ0V4cG9zdXJlVGltZScsXHJcbiAgICAgICAgMHhBMzAwOiAnRmlsZVNvdXJjZScsXHJcbiAgICAgICAgMHg5MjA5OiAnRmxhc2gnLFxyXG4gICAgICAgIDB4QTAwMDogJ0ZsYXNocGl4VmVyc2lvbicsXHJcbiAgICAgICAgMHg4MjlEOiAnRk51bWJlcicsXHJcbiAgICAgICAgMHhBNDIwOiAnSW1hZ2VVbmlxdWVJRCcsXHJcbiAgICAgICAgMHg5MjA4OiAnTGlnaHRTb3VyY2UnLFxyXG4gICAgICAgIDB4OTI3QzogJ01ha2VyTm90ZScsXHJcbiAgICAgICAgMHg5MjAxOiAnU2h1dHRlclNwZWVkVmFsdWUnLFxyXG4gICAgICAgIDB4OTI4NjogJ1VzZXJDb21tZW50JyxcclxuXHJcbiAgICAgICAgLy8gSVBUQ1xyXG4gICAgICAgIDB4ODNCQjogJ0lQVEMnLFxyXG5cclxuICAgICAgICAvLyBJQ0NcclxuICAgICAgICAweDg3NzM6ICdJQ0MgUHJvZmlsZScsXHJcblxyXG4gICAgICAgIC8vIFhNUFxyXG4gICAgICAgIDB4MDJCQzogJ1hNUCcsXHJcblxyXG4gICAgICAgIC8vIEdEQUxcclxuICAgICAgICAweEE0ODA6ICdHREFMX01FVEFEQVRBJyxcclxuICAgICAgICAweEE0ODE6ICdHREFMX05PREFUQScsXHJcblxyXG4gICAgICAgIC8vIFBob3Rvc2hvcFxyXG4gICAgICAgIDB4ODY0OTogJ1Bob3Rvc2hvcCdcclxuICAgIH0sXHJcblxyXG4gICAgZmllbGRUeXBlTmFtZXM6IHtcclxuICAgICAgICAweDAwMDE6ICdCWVRFJyxcclxuICAgICAgICAweDAwMDI6ICdBU0NJSScsXHJcbiAgICAgICAgMHgwMDAzOiAnU0hPUlQnLFxyXG4gICAgICAgIDB4MDAwNDogJ0xPTkcnLFxyXG4gICAgICAgIDB4MDAwNTogJ1JBVElPTkFMJyxcclxuICAgICAgICAweDAwMDY6ICdTQllURScsXHJcbiAgICAgICAgMHgwMDA3OiAnVU5ERUZJTkVEJyxcclxuICAgICAgICAweDAwMDg6ICdTU0hPUlQnLFxyXG4gICAgICAgIDB4MDAwOTogJ1NMT05HJyxcclxuICAgICAgICAweDAwMEE6ICdTUkFUSU9OQUwnLFxyXG4gICAgICAgIDB4MDAwQjogJ0ZMT0FUJyxcclxuICAgICAgICAweDAwMEM6ICdET1VCTEUnXHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHRpZmZSZWFkZXI7Il0sInNvdXJjZVJvb3QiOiIvIn0=