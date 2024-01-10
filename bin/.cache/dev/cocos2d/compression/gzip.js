
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/compression/gzip.js';
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

/**
 * See cc.Codec.GZip.gunzip.
 * @param {Array | String} data The bytestream to decompress
 * Constructor
 */
var GZip = function Jacob__GZip(data) {
  this.data = data;
  this.debug = false;
  this.gpflags = undefined;
  this.files = 0;
  this.unzipped = [];
  this.buf32k = new Array(32768);
  this.bIdx = 0;
  this.modeZIP = false;
  this.bytepos = 0;
  this.bb = 1;
  this.bits = 0;
  this.nameBuf = [];
  this.fileout = undefined;
  this.literalTree = new Array(GZip.LITERALS);
  this.distanceTree = new Array(32);
  this.treepos = 0;
  this.Places = null;
  this.len = 0;
  this.fpos = new Array(17);
  this.fpos[0] = 0;
  this.flens = undefined;
  this.fmax = undefined;
};
/**
 * Unzips the gzipped data of the 'data' argument.
 * @param string  The bytestream to decompress. Either an array of Integers between 0 and 255, or a String.
 * @return {String}
 */


GZip.gunzip = function (string) {
  if (string.constructor === Array) {} else if (string.constructor === String) {}

  var gzip = new GZip(string);
  return gzip.gunzip()[0][0];
};

GZip.HufNode = function () {
  this.b0 = 0;
  this.b1 = 0;
  this.jump = null;
  this.jumppos = -1;
};
/**
 * @constant
 * @type Number
 */


GZip.LITERALS = 288;
/**
 * @constant
 * @type Number
 */

GZip.NAMEMAX = 256;
GZip.bitReverse = [0x00, 0x80, 0x40, 0xc0, 0x20, 0xa0, 0x60, 0xe0, 0x10, 0x90, 0x50, 0xd0, 0x30, 0xb0, 0x70, 0xf0, 0x08, 0x88, 0x48, 0xc8, 0x28, 0xa8, 0x68, 0xe8, 0x18, 0x98, 0x58, 0xd8, 0x38, 0xb8, 0x78, 0xf8, 0x04, 0x84, 0x44, 0xc4, 0x24, 0xa4, 0x64, 0xe4, 0x14, 0x94, 0x54, 0xd4, 0x34, 0xb4, 0x74, 0xf4, 0x0c, 0x8c, 0x4c, 0xcc, 0x2c, 0xac, 0x6c, 0xec, 0x1c, 0x9c, 0x5c, 0xdc, 0x3c, 0xbc, 0x7c, 0xfc, 0x02, 0x82, 0x42, 0xc2, 0x22, 0xa2, 0x62, 0xe2, 0x12, 0x92, 0x52, 0xd2, 0x32, 0xb2, 0x72, 0xf2, 0x0a, 0x8a, 0x4a, 0xca, 0x2a, 0xaa, 0x6a, 0xea, 0x1a, 0x9a, 0x5a, 0xda, 0x3a, 0xba, 0x7a, 0xfa, 0x06, 0x86, 0x46, 0xc6, 0x26, 0xa6, 0x66, 0xe6, 0x16, 0x96, 0x56, 0xd6, 0x36, 0xb6, 0x76, 0xf6, 0x0e, 0x8e, 0x4e, 0xce, 0x2e, 0xae, 0x6e, 0xee, 0x1e, 0x9e, 0x5e, 0xde, 0x3e, 0xbe, 0x7e, 0xfe, 0x01, 0x81, 0x41, 0xc1, 0x21, 0xa1, 0x61, 0xe1, 0x11, 0x91, 0x51, 0xd1, 0x31, 0xb1, 0x71, 0xf1, 0x09, 0x89, 0x49, 0xc9, 0x29, 0xa9, 0x69, 0xe9, 0x19, 0x99, 0x59, 0xd9, 0x39, 0xb9, 0x79, 0xf9, 0x05, 0x85, 0x45, 0xc5, 0x25, 0xa5, 0x65, 0xe5, 0x15, 0x95, 0x55, 0xd5, 0x35, 0xb5, 0x75, 0xf5, 0x0d, 0x8d, 0x4d, 0xcd, 0x2d, 0xad, 0x6d, 0xed, 0x1d, 0x9d, 0x5d, 0xdd, 0x3d, 0xbd, 0x7d, 0xfd, 0x03, 0x83, 0x43, 0xc3, 0x23, 0xa3, 0x63, 0xe3, 0x13, 0x93, 0x53, 0xd3, 0x33, 0xb3, 0x73, 0xf3, 0x0b, 0x8b, 0x4b, 0xcb, 0x2b, 0xab, 0x6b, 0xeb, 0x1b, 0x9b, 0x5b, 0xdb, 0x3b, 0xbb, 0x7b, 0xfb, 0x07, 0x87, 0x47, 0xc7, 0x27, 0xa7, 0x67, 0xe7, 0x17, 0x97, 0x57, 0xd7, 0x37, 0xb7, 0x77, 0xf7, 0x0f, 0x8f, 0x4f, 0xcf, 0x2f, 0xaf, 0x6f, 0xef, 0x1f, 0x9f, 0x5f, 0xdf, 0x3f, 0xbf, 0x7f, 0xff];
GZip.cplens = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
GZip.cplext = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99];
/* 99==invalid */

GZip.cpdist = [0x0001, 0x0002, 0x0003, 0x0004, 0x0005, 0x0007, 0x0009, 0x000d, 0x0011, 0x0019, 0x0021, 0x0031, 0x0041, 0x0061, 0x0081, 0x00c1, 0x0101, 0x0181, 0x0201, 0x0301, 0x0401, 0x0601, 0x0801, 0x0c01, 0x1001, 0x1801, 0x2001, 0x3001, 0x4001, 0x6001];
GZip.cpdext = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
GZip.border = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
/**
 * gunzip
 * @return {Array}
 */

GZip.prototype.gunzip = function () {
  this.outputArr = []; //convertToByteArray(input);
  //if (this.debug) alert(this.data);

  this.nextFile();
  return this.unzipped;
};

GZip.prototype.readByte = function () {
  this.bits += 8;

  if (this.bytepos < this.data.length) {
    //return this.data[this.bytepos++]; // Array
    return this.data.charCodeAt(this.bytepos++);
  } else {
    return -1;
  }
};

GZip.prototype.byteAlign = function () {
  this.bb = 1;
};

GZip.prototype.readBit = function () {
  var carry;
  this.bits++;
  carry = this.bb & 1;
  this.bb >>= 1;

  if (this.bb === 0) {
    this.bb = this.readByte();
    carry = this.bb & 1;
    this.bb = this.bb >> 1 | 0x80;
  }

  return carry;
};

GZip.prototype.readBits = function (a) {
  var res = 0,
      i = a;

  while (i--) {
    res = res << 1 | this.readBit();
  }

  if (a) res = GZip.bitReverse[res] >> 8 - a;
  return res;
};

GZip.prototype.flushBuffer = function () {
  this.bIdx = 0;
};

GZip.prototype.addBuffer = function (a) {
  this.buf32k[this.bIdx++] = a;
  this.outputArr.push(String.fromCharCode(a));
  if (this.bIdx === 0x8000) this.bIdx = 0;
};

GZip.prototype.IsPat = function () {
  while (1) {
    if (this.fpos[this.len] >= this.fmax) return -1;
    if (this.flens[this.fpos[this.len]] === this.len) return this.fpos[this.len]++;
    this.fpos[this.len]++;
  }
};

GZip.prototype.Rec = function () {
  var curplace = this.Places[this.treepos];
  var tmp; //if (this.debug) document.write("<br>len:"+this.len+" treepos:"+this.treepos);

  if (this.len === 17) {
    //war 17
    return -1;
  }

  this.treepos++;
  this.len++;
  tmp = this.IsPat(); //if (this.debug) document.write("<br>IsPat "+tmp);

  if (tmp >= 0) {
    curplace.b0 = tmp;
    /* leaf cell for 0-bit */
    //if (this.debug) document.write("<br>b0 "+curplace.b0);
  } else {
    /* Not a Leaf cell */
    curplace.b0 = 0x8000; //if (this.debug) document.write("<br>b0 "+curplace.b0);

    if (this.Rec()) return -1;
  }

  tmp = this.IsPat();

  if (tmp >= 0) {
    curplace.b1 = tmp;
    /* leaf cell for 1-bit */
    //if (this.debug) document.write("<br>b1 "+curplace.b1);

    curplace.jump = null;
    /* Just for the display routine */
  } else {
    /* Not a Leaf cell */
    curplace.b1 = 0x8000; //if (this.debug) document.write("<br>b1 "+curplace.b1);

    curplace.jump = this.Places[this.treepos];
    curplace.jumppos = this.treepos;
    if (this.Rec()) return -1;
  }

  this.len--;
  return 0;
};

GZip.prototype.CreateTree = function (currentTree, numval, lengths, show) {
  var i;
  /* Create the Huffman decode tree/table */
  //if (this.debug) document.write("currentTree "+currentTree+" numval "+numval+" lengths "+lengths+" show "+show);

  this.Places = currentTree;
  this.treepos = 0;
  this.flens = lengths;
  this.fmax = numval;

  for (i = 0; i < 17; i++) {
    this.fpos[i] = 0;
  }

  this.len = 0;

  if (this.Rec()) {
    //if (this.debug) alert("invalid huffman tree\n");
    return -1;
  } // if (this.debug) {
  //   document.write('<br>Tree: '+this.Places.length);
  //   for (var a=0;a<32;a++){
  //     document.write("Places["+a+"].b0="+this.Places[a].b0+"<br>");
  //     document.write("Places["+a+"].b1="+this.Places[a].b1+"<br>");
  //   }
  // }


  return 0;
};

GZip.prototype.DecodeValue = function (currentTree) {
  var len,
      i,
      xtreepos = 0,
      X = currentTree[xtreepos],
      b;
  /* decode one symbol of the data */

  while (1) {
    b = this.readBit(); // if (this.debug) document.write("b="+b);

    if (b) {
      if (!(X.b1 & 0x8000)) {
        // if (this.debug) document.write("ret1");
        return X.b1;
        /* If leaf node, return data */
      }

      X = X.jump;
      len = currentTree.length;

      for (i = 0; i < len; i++) {
        if (currentTree[i] === X) {
          xtreepos = i;
          break;
        }
      }
    } else {
      if (!(X.b0 & 0x8000)) {
        // if (this.debug) document.write("ret2");
        return X.b0;
        /* If leaf node, return data */
      }

      xtreepos++;
      X = currentTree[xtreepos];
    }
  } // if (this.debug) document.write("ret3");


  return -1;
};

GZip.prototype.DeflateLoop = function () {
  var last, c, type, i, len;

  do {
    last = this.readBit();
    type = this.readBits(2);

    if (type === 0) {
      var blockLen, cSum; // Stored

      this.byteAlign();
      blockLen = this.readByte();
      blockLen |= this.readByte() << 8;
      cSum = this.readByte();
      cSum |= this.readByte() << 8;

      if ((blockLen ^ ~cSum) & 0xffff) {
        document.write("BlockLen checksum mismatch\n"); // FIXME: use throw
      }

      while (blockLen--) {
        c = this.readByte();
        this.addBuffer(c);
      }
    } else if (type === 1) {
      var j;
      /* Fixed Huffman tables -- fixed decode routine */

      while (1) {
        /*
         256    0000000        0
         :   :     :
         279    0010111        23
         0   00110000    48
         :    :      :
         143    10111111    191
         280 11000000    192
         :    :      :
         287 11000111    199
         144    110010000    400
         :    :       :
         255    111111111    511
           Note the bit order!
         */
        j = GZip.bitReverse[this.readBits(7)] >> 1;

        if (j > 23) {
          j = j << 1 | this.readBit();
          /* 48..255 */

          if (j > 199) {
            /* 200..255 */
            j -= 128;
            /*  72..127 */

            j = j << 1 | this.readBit();
            /* 144..255 << */
          } else {
            /*  48..199 */
            j -= 48;
            /*   0..151 */

            if (j > 143) {
              j = j + 136;
              /* 280..287 << */

              /*   0..143 << */
            }
          }
        } else {
          /*   0..23 */
          j += 256;
          /* 256..279 << */
        }

        if (j < 256) {
          this.addBuffer(j);
        } else if (j === 256) {
          /* EOF */
          break; // FIXME: make this the loop-condition
        } else {
          var len, dist;
          j -= 256 + 1;
          /* bytes + EOF */

          len = this.readBits(GZip.cplext[j]) + GZip.cplens[j];
          j = GZip.bitReverse[this.readBits(5)] >> 3;

          if (GZip.cpdext[j] > 8) {
            dist = this.readBits(8);
            dist |= this.readBits(GZip.cpdext[j] - 8) << 8;
          } else {
            dist = this.readBits(GZip.cpdext[j]);
          }

          dist += GZip.cpdist[j];

          for (j = 0; j < len; j++) {
            var c = this.buf32k[this.bIdx - dist & 0x7fff];
            this.addBuffer(c);
          }
        }
      } // while

    } else if (type === 2) {
      var j, n, literalCodes, distCodes, lenCodes;
      var ll = new Array(288 + 32); // "static" just to preserve stack
      // Dynamic Huffman tables

      literalCodes = 257 + this.readBits(5);
      distCodes = 1 + this.readBits(5);
      lenCodes = 4 + this.readBits(4);

      for (j = 0; j < 19; j++) {
        ll[j] = 0;
      } // Get the decode tree code lengths


      for (j = 0; j < lenCodes; j++) {
        ll[GZip.border[j]] = this.readBits(3);
      }

      len = this.distanceTree.length;

      for (i = 0; i < len; i++) {
        this.distanceTree[i] = new GZip.HufNode();
      }

      if (this.CreateTree(this.distanceTree, 19, ll, 0)) {
        this.flushBuffer();
        return 1;
      } // if (this.debug) {
      //   document.write("<br>distanceTree");
      //   for(var a=0;a<this.distanceTree.length;a++){
      //     document.write("<br>"+this.distanceTree[a].b0+" "+this.distanceTree[a].b1+" "+this.distanceTree[a].jump+" "+this.distanceTree[a].jumppos);
      //   }
      // }
      //read in literal and distance code lengths


      n = literalCodes + distCodes;
      i = 0;
      var z = -1; // if (this.debug) document.write("<br>n="+n+" bits: "+this.bits+"<br>");

      while (i < n) {
        z++;
        j = this.DecodeValue(this.distanceTree); // if (this.debug) document.write("<br>"+z+" i:"+i+" decode: "+j+"    bits "+this.bits+"<br>");

        if (j < 16) {
          // length of code in bits (0..15)
          ll[i++] = j;
        } else if (j === 16) {
          // repeat last length 3 to 6 times
          var l;
          j = 3 + this.readBits(2);

          if (i + j > n) {
            this.flushBuffer();
            return 1;
          }

          l = i ? ll[i - 1] : 0;

          while (j--) {
            ll[i++] = l;
          }
        } else {
          if (j === 17) {
            // 3 to 10 zero length codes
            j = 3 + this.readBits(3);
          } else {
            // j == 18: 11 to 138 zero length codes
            j = 11 + this.readBits(7);
          }

          if (i + j > n) {
            this.flushBuffer();
            return 1;
          }

          while (j--) {
            ll[i++] = 0;
          }
        }
      } // while
      // Can overwrite tree decode tree as it is not used anymore


      len = this.literalTree.length;

      for (i = 0; i < len; i++) {
        this.literalTree[i] = new GZip.HufNode();
      }

      if (this.CreateTree(this.literalTree, literalCodes, ll, 0)) {
        this.flushBuffer();
        return 1;
      }

      len = this.literalTree.length;

      for (i = 0; i < len; i++) {
        this.distanceTree[i] = new GZip.HufNode();
      }

      var ll2 = new Array();

      for (i = literalCodes; i < ll.length; i++) {
        ll2[i - literalCodes] = ll[i];
      }

      if (this.CreateTree(this.distanceTree, distCodes, ll2, 0)) {
        this.flushBuffer();
        return 1;
      } // if (this.debug) document.write("<br>literalTree");


      while (1) {
        j = this.DecodeValue(this.literalTree);

        if (j >= 256) {
          // In C64: if carry set
          var len, dist;
          j -= 256;

          if (j === 0) {
            // EOF
            break;
          }

          j--;
          len = this.readBits(GZip.cplext[j]) + GZip.cplens[j];
          j = this.DecodeValue(this.distanceTree);

          if (GZip.cpdext[j] > 8) {
            dist = this.readBits(8);
            dist |= this.readBits(GZip.cpdext[j] - 8) << 8;
          } else {
            dist = this.readBits(GZip.cpdext[j]);
          }

          dist += GZip.cpdist[j];

          while (len--) {
            var c = this.buf32k[this.bIdx - dist & 0x7fff];
            this.addBuffer(c);
          }
        } else {
          this.addBuffer(j);
        }
      } // while

    }
  } while (!last);

  this.flushBuffer();
  this.byteAlign();
  return 0;
};

GZip.prototype.unzipFile = function (name) {
  var i;
  this.gunzip();

  for (i = 0; i < this.unzipped.length; i++) {
    if (this.unzipped[i][1] === name) {
      return this.unzipped[i][0];
    }
  }
};

GZip.prototype.nextFile = function () {
  // if (this.debug) alert("NEXTFILE");
  this.outputArr = [];
  this.modeZIP = false;
  var tmp = [];
  tmp[0] = this.readByte();
  tmp[1] = this.readByte(); // if (this.debug) alert("type: "+tmp[0]+" "+tmp[1]);

  if (tmp[0] === 0x78 && tmp[1] === 0xda) {
    //GZIP
    // if (this.debug) alert("GEONExT-GZIP");
    this.DeflateLoop(); // if (this.debug) alert(this.outputArr.join(''));

    this.unzipped[this.files] = [this.outputArr.join(''), "geonext.gxt"];
    this.files++;
  }

  if (tmp[0] === 0x1f && tmp[1] === 0x8b) {
    //GZIP
    // if (this.debug) alert("GZIP");
    this.skipdir(); // if (this.debug) alert(this.outputArr.join(''));

    this.unzipped[this.files] = [this.outputArr.join(''), "file"];
    this.files++;
  }

  if (tmp[0] === 0x50 && tmp[1] === 0x4b) {
    //ZIP
    this.modeZIP = true;
    tmp[2] = this.readByte();
    tmp[3] = this.readByte();

    if (tmp[2] === 0x03 && tmp[3] === 0x04) {
      //MODE_ZIP
      tmp[0] = this.readByte();
      tmp[1] = this.readByte(); // if (this.debug) alert("ZIP-Version: "+tmp[1]+" "+tmp[0]/10+"."+tmp[0]%10);

      this.gpflags = this.readByte();
      this.gpflags |= this.readByte() << 8; // if (this.debug) alert("gpflags: "+this.gpflags);

      var method = this.readByte();
      method |= this.readByte() << 8; // if (this.debug) alert("method: "+method);

      this.readByte();
      this.readByte();
      this.readByte();
      this.readByte(); //       var crc = this.readByte();
      //       crc |= (this.readByte()<<8);
      //       crc |= (this.readByte()<<16);
      //       crc |= (this.readByte()<<24);

      var compSize = this.readByte();
      compSize |= this.readByte() << 8;
      compSize |= this.readByte() << 16;
      compSize |= this.readByte() << 24;
      var size = this.readByte();
      size |= this.readByte() << 8;
      size |= this.readByte() << 16;
      size |= this.readByte() << 24; // if (this.debug) alert("local CRC: "+crc+"\nlocal Size: "+size+"\nlocal CompSize: "+compSize);

      var filelen = this.readByte();
      filelen |= this.readByte() << 8;
      var extralen = this.readByte();
      extralen |= this.readByte() << 8; // if (this.debug) alert("filelen "+filelen);

      i = 0;
      this.nameBuf = [];

      while (filelen--) {
        var c = this.readByte();

        if (c === "/" | c === ":") {
          i = 0;
        } else if (i < GZip.NAMEMAX - 1) {
          this.nameBuf[i++] = String.fromCharCode(c);
        }
      } // if (this.debug) alert("nameBuf: "+this.nameBuf);


      if (!this.fileout) this.fileout = this.nameBuf;
      var i = 0;

      while (i < extralen) {
        c = this.readByte();
        i++;
      } // if (size = 0 && this.fileOut.charAt(this.fileout.length-1)=="/"){
      //   //skipdir
      //   // if (this.debug) alert("skipdir");
      // }


      if (method === 8) {
        this.DeflateLoop(); // if (this.debug) alert(this.outputArr.join(''));

        this.unzipped[this.files] = [this.outputArr.join(''), this.nameBuf.join('')];
        this.files++;
      }

      this.skipdir();
    }
  }
};

GZip.prototype.skipdir = function () {
  var tmp = [];
  var compSize, size, os, i, c;

  if (this.gpflags & 8) {
    tmp[0] = this.readByte();
    tmp[1] = this.readByte();
    tmp[2] = this.readByte();
    tmp[3] = this.readByte(); //     if (tmp[0] == 0x50 && tmp[1] == 0x4b && tmp[2] == 0x07 && tmp[3] == 0x08) {
    //       crc = this.readByte();
    //       crc |= (this.readByte()<<8);
    //       crc |= (this.readByte()<<16);
    //       crc |= (this.readByte()<<24);
    //     } else {
    //       crc = tmp[0] | (tmp[1]<<8) | (tmp[2]<<16) | (tmp[3]<<24);
    //     }

    compSize = this.readByte();
    compSize |= this.readByte() << 8;
    compSize |= this.readByte() << 16;
    compSize |= this.readByte() << 24;
    size = this.readByte();
    size |= this.readByte() << 8;
    size |= this.readByte() << 16;
    size |= this.readByte() << 24;
  }

  if (this.modeZIP) this.nextFile();
  tmp[0] = this.readByte();

  if (tmp[0] !== 8) {
    // if (this.debug) alert("Unknown compression method!");
    return 0;
  }

  this.gpflags = this.readByte(); // if (this.debug && (this.gpflags & ~(0x1f))) alert("Unknown flags set!");

  this.readByte();
  this.readByte();
  this.readByte();
  this.readByte();
  this.readByte();
  os = this.readByte();

  if (this.gpflags & 4) {
    tmp[0] = this.readByte();
    tmp[2] = this.readByte();
    this.len = tmp[0] + 256 * tmp[1]; // if (this.debug) alert("Extra field size: "+this.len);

    for (i = 0; i < this.len; i++) {
      this.readByte();
    }
  }

  if (this.gpflags & 8) {
    i = 0;
    this.nameBuf = [];

    while (c = this.readByte()) {
      if (c === "7" || c === ":") i = 0;
      if (i < GZip.NAMEMAX - 1) this.nameBuf[i++] = c;
    } //this.nameBuf[i] = "\0";
    // if (this.debug) alert("original file name: "+this.nameBuf);

  }

  if (this.gpflags & 16) {
    while (c = this.readByte()) {// FIXME: looks like they read to the end of the stream, should be doable more efficiently
      //FILE COMMENT
    }
  }

  if (this.gpflags & 2) {
    this.readByte();
    this.readByte();
  }

  this.DeflateLoop(); //   crc = this.readByte();
  //   crc |= (this.readByte()<<8);
  //   crc |= (this.readByte()<<16);
  //   crc |= (this.readByte()<<24);

  size = this.readByte();
  size |= this.readByte() << 8;
  size |= this.readByte() << 16;
  size |= this.readByte() << 24;
  if (this.modeZIP) this.nextFile();
};

module.exports = GZip;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvbXByZXNzaW9uXFxnemlwLmpzIl0sIm5hbWVzIjpbIkdaaXAiLCJKYWNvYl9fR1ppcCIsImRhdGEiLCJkZWJ1ZyIsImdwZmxhZ3MiLCJ1bmRlZmluZWQiLCJmaWxlcyIsInVuemlwcGVkIiwiYnVmMzJrIiwiQXJyYXkiLCJiSWR4IiwibW9kZVpJUCIsImJ5dGVwb3MiLCJiYiIsImJpdHMiLCJuYW1lQnVmIiwiZmlsZW91dCIsImxpdGVyYWxUcmVlIiwiTElURVJBTFMiLCJkaXN0YW5jZVRyZWUiLCJ0cmVlcG9zIiwiUGxhY2VzIiwibGVuIiwiZnBvcyIsImZsZW5zIiwiZm1heCIsImd1bnppcCIsInN0cmluZyIsImNvbnN0cnVjdG9yIiwiU3RyaW5nIiwiZ3ppcCIsIkh1Zk5vZGUiLCJiMCIsImIxIiwianVtcCIsImp1bXBwb3MiLCJOQU1FTUFYIiwiYml0UmV2ZXJzZSIsImNwbGVucyIsImNwbGV4dCIsImNwZGlzdCIsImNwZGV4dCIsImJvcmRlciIsInByb3RvdHlwZSIsIm91dHB1dEFyciIsIm5leHRGaWxlIiwicmVhZEJ5dGUiLCJsZW5ndGgiLCJjaGFyQ29kZUF0IiwiYnl0ZUFsaWduIiwicmVhZEJpdCIsImNhcnJ5IiwicmVhZEJpdHMiLCJhIiwicmVzIiwiaSIsImZsdXNoQnVmZmVyIiwiYWRkQnVmZmVyIiwicHVzaCIsImZyb21DaGFyQ29kZSIsIklzUGF0IiwiUmVjIiwiY3VycGxhY2UiLCJ0bXAiLCJDcmVhdGVUcmVlIiwiY3VycmVudFRyZWUiLCJudW12YWwiLCJsZW5ndGhzIiwic2hvdyIsIkRlY29kZVZhbHVlIiwieHRyZWVwb3MiLCJYIiwiYiIsIkRlZmxhdGVMb29wIiwibGFzdCIsImMiLCJ0eXBlIiwiYmxvY2tMZW4iLCJjU3VtIiwiZG9jdW1lbnQiLCJ3cml0ZSIsImoiLCJkaXN0IiwibiIsImxpdGVyYWxDb2RlcyIsImRpc3RDb2RlcyIsImxlbkNvZGVzIiwibGwiLCJ6IiwibCIsImxsMiIsInVuemlwRmlsZSIsIm5hbWUiLCJqb2luIiwic2tpcGRpciIsIm1ldGhvZCIsImNvbXBTaXplIiwic2l6ZSIsImZpbGVsZW4iLCJleHRyYWxlbiIsIm9zIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLElBQUksR0FBRyxTQUFTQyxXQUFULENBQXFCQyxJQUFyQixFQUEyQjtBQUNsQyxPQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFFQSxPQUFLQyxLQUFMLEdBQWEsS0FBYjtBQUNBLE9BQUtDLE9BQUwsR0FBZUMsU0FBZjtBQUNBLE9BQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxJQUFJQyxLQUFKLENBQVUsS0FBVixDQUFkO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxPQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNBLE9BQUtDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsT0FBS0MsRUFBTCxHQUFVLENBQVY7QUFDQSxPQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLE9BQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsT0FBS0MsT0FBTCxHQUFlWCxTQUFmO0FBQ0EsT0FBS1ksV0FBTCxHQUFtQixJQUFJUixLQUFKLENBQVVULElBQUksQ0FBQ2tCLFFBQWYsQ0FBbkI7QUFDQSxPQUFLQyxZQUFMLEdBQW9CLElBQUlWLEtBQUosQ0FBVSxFQUFWLENBQXBCO0FBQ0EsT0FBS1csT0FBTCxHQUFlLENBQWY7QUFDQSxPQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLE9BQUtDLEdBQUwsR0FBVyxDQUFYO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLElBQUlkLEtBQUosQ0FBVSxFQUFWLENBQVo7QUFDQSxPQUFLYyxJQUFMLENBQVUsQ0FBVixJQUFlLENBQWY7QUFDQSxPQUFLQyxLQUFMLEdBQWFuQixTQUFi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Q29weXJpZ2h0IDIwMDktMjAxMCBieSBTdGVmYW4gUnVzdGVyaG9sei5cclxuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiBZb3UgY2FuIGNob29zZSBiZXR3ZWVuIE1JVCBhbmQgQlNELTMtQ2xhdXNlIGxpY2Vuc2UuIExpY2Vuc2UgZmlsZSB3aWxsIGJlIGFkZGVkIGxhdGVyLlxyXG4gLS0qL1xyXG5cclxuLyoqXHJcbiAqIFNlZSBjYy5Db2RlYy5HWmlwLmd1bnppcC5cclxuICogQHBhcmFtIHtBcnJheSB8IFN0cmluZ30gZGF0YSBUaGUgYnl0ZXN0cmVhbSB0byBkZWNvbXByZXNzXHJcbiAqIENvbnN0cnVjdG9yXHJcbiAqL1xyXG52YXIgR1ppcCA9IGZ1bmN0aW9uIEphY29iX19HWmlwKGRhdGEpIHtcclxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgdGhpcy5kZWJ1ZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5ncGZsYWdzID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5maWxlcyA9IDA7XHJcbiAgICB0aGlzLnVuemlwcGVkID0gW107XHJcbiAgICB0aGlzLmJ1ZjMyayA9IG5ldyBBcnJheSgzMjc2OCk7XHJcbiAgICB0aGlzLmJJZHggPSAwO1xyXG4gICAgdGhpcy5tb2RlWklQID0gZmFsc2U7XHJcbiAgICB0aGlzLmJ5dGVwb3MgPSAwO1xyXG4gICAgdGhpcy5iYiA9IDE7XHJcbiAgICB0aGlzLmJpdHMgPSAwO1xyXG4gICAgdGhpcy5uYW1lQnVmID0gW107XHJcbiAgICB0aGlzLmZpbGVvdXQgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmxpdGVyYWxUcmVlID0gbmV3IEFycmF5KEdaaXAuTElURVJBTFMpO1xyXG4gICAgdGhpcy5kaXN0YW5jZVRyZWUgPSBuZXcgQXJyYXkoMzIpO1xyXG4gICAgdGhpcy50cmVlcG9zID0gMDtcclxuICAgIHRoaXMuUGxhY2VzID0gbnVsbDtcclxuICAgIHRoaXMubGVuID0gMDtcclxuICAgIHRoaXMuZnBvcyA9IG5ldyBBcnJheSgxNyk7XHJcbiAgICB0aGlzLmZwb3NbMF0gPSAwO1xyXG4gICAgdGhpcy5mbGVucyA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZm1heCA9IHVuZGVmaW5lZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVbnppcHMgdGhlIGd6aXBwZWQgZGF0YSBvZiB0aGUgJ2RhdGEnIGFyZ3VtZW50LlxyXG4gKiBAcGFyYW0gc3RyaW5nICBUaGUgYnl0ZXN0cmVhbSB0byBkZWNvbXByZXNzLiBFaXRoZXIgYW4gYXJyYXkgb2YgSW50ZWdlcnMgYmV0d2VlbiAwIGFuZCAyNTUsIG9yIGEgU3RyaW5nLlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG5HWmlwLmd1bnppcCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgIGlmIChzdHJpbmcuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcbiAgICB9IGVsc2UgaWYgKHN0cmluZy5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nKSB7XHJcbiAgICB9XHJcbiAgICB2YXIgZ3ppcCA9IG5ldyBHWmlwKHN0cmluZyk7XHJcbiAgICByZXR1cm4gZ3ppcC5ndW56aXAoKVswXVswXTtcclxufTtcclxuXHJcbkdaaXAuSHVmTm9kZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYjAgPSAwO1xyXG4gICAgdGhpcy5iMSA9IDA7XHJcbiAgICB0aGlzLmp1bXAgPSBudWxsO1xyXG4gICAgdGhpcy5qdW1wcG9zID0gLTE7XHJcbn07XHJcblxyXG4vKipcclxuICogQGNvbnN0YW50XHJcbiAqIEB0eXBlIE51bWJlclxyXG4gKi9cclxuR1ppcC5MSVRFUkFMUyA9IDI4ODtcclxuLyoqXHJcbiAqIEBjb25zdGFudFxyXG4gKiBAdHlwZSBOdW1iZXJcclxuICovXHJcbkdaaXAuTkFNRU1BWCA9IDI1NjtcclxuXHJcbkdaaXAuYml0UmV2ZXJzZSA9IFtcclxuICAgIDB4MDAsIDB4ODAsIDB4NDAsIDB4YzAsIDB4MjAsIDB4YTAsIDB4NjAsIDB4ZTAsXHJcbiAgICAweDEwLCAweDkwLCAweDUwLCAweGQwLCAweDMwLCAweGIwLCAweDcwLCAweGYwLFxyXG4gICAgMHgwOCwgMHg4OCwgMHg0OCwgMHhjOCwgMHgyOCwgMHhhOCwgMHg2OCwgMHhlOCxcclxuICAgIDB4MTgsIDB4OTgsIDB4NTgsIDB4ZDgsIDB4MzgsIDB4YjgsIDB4NzgsIDB4ZjgsXHJcbiAgICAweDA0LCAweDg0LCAweDQ0LCAweGM0LCAweDI0LCAweGE0LCAweDY0LCAweGU0LFxyXG4gICAgMHgxNCwgMHg5NCwgMHg1NCwgMHhkNCwgMHgzNCwgMHhiNCwgMHg3NCwgMHhmNCxcclxuICAgIDB4MGMsIDB4OGMsIDB4NGMsIDB4Y2MsIDB4MmMsIDB4YWMsIDB4NmMsIDB4ZWMsXHJcbiAgICAweDFjLCAweDljLCAweDVjLCAweGRjLCAweDNjLCAweGJjLCAweDdjLCAweGZjLFxyXG4gICAgMHgwMiwgMHg4MiwgMHg0MiwgMHhjMiwgMHgyMiwgMHhhMiwgMHg2MiwgMHhlMixcclxuICAgIDB4MTIsIDB4OTIsIDB4NTIsIDB4ZDIsIDB4MzIsIDB4YjIsIDB4NzIsIDB4ZjIsXHJcbiAgICAweDBhLCAweDhhLCAweDRhLCAweGNhLCAweDJhLCAweGFhLCAweDZhLCAweGVhLFxyXG4gICAgMHgxYSwgMHg5YSwgMHg1YSwgMHhkYSwgMHgzYSwgMHhiYSwgMHg3YSwgMHhmYSxcclxuICAgIDB4MDYsIDB4ODYsIDB4NDYsIDB4YzYsIDB4MjYsIDB4YTYsIDB4NjYsIDB4ZTYsXHJcbiAgICAweDE2LCAweDk2LCAweDU2LCAweGQ2LCAweDM2LCAweGI2LCAweDc2LCAweGY2LFxyXG4gICAgMHgwZSwgMHg4ZSwgMHg0ZSwgMHhjZSwgMHgyZSwgMHhhZSwgMHg2ZSwgMHhlZSxcclxuICAgIDB4MWUsIDB4OWUsIDB4NWUsIDB4ZGUsIDB4M2UsIDB4YmUsIDB4N2UsIDB4ZmUsXHJcbiAgICAweDAxLCAweDgxLCAweDQxLCAweGMxLCAweDIxLCAweGExLCAweDYxLCAweGUxLFxyXG4gICAgMHgxMSwgMHg5MSwgMHg1MSwgMHhkMSwgMHgzMSwgMHhiMSwgMHg3MSwgMHhmMSxcclxuICAgIDB4MDksIDB4ODksIDB4NDksIDB4YzksIDB4MjksIDB4YTksIDB4NjksIDB4ZTksXHJcbiAgICAweDE5LCAweDk5LCAweDU5LCAweGQ5LCAweDM5LCAweGI5LCAweDc5LCAweGY5LFxyXG4gICAgMHgwNSwgMHg4NSwgMHg0NSwgMHhjNSwgMHgyNSwgMHhhNSwgMHg2NSwgMHhlNSxcclxuICAgIDB4MTUsIDB4OTUsIDB4NTUsIDB4ZDUsIDB4MzUsIDB4YjUsIDB4NzUsIDB4ZjUsXHJcbiAgICAweDBkLCAweDhkLCAweDRkLCAweGNkLCAweDJkLCAweGFkLCAweDZkLCAweGVkLFxyXG4gICAgMHgxZCwgMHg5ZCwgMHg1ZCwgMHhkZCwgMHgzZCwgMHhiZCwgMHg3ZCwgMHhmZCxcclxuICAgIDB4MDMsIDB4ODMsIDB4NDMsIDB4YzMsIDB4MjMsIDB4YTMsIDB4NjMsIDB4ZTMsXHJcbiAgICAweDEzLCAweDkzLCAweDUzLCAweGQzLCAweDMzLCAweGIzLCAweDczLCAweGYzLFxyXG4gICAgMHgwYiwgMHg4YiwgMHg0YiwgMHhjYiwgMHgyYiwgMHhhYiwgMHg2YiwgMHhlYixcclxuICAgIDB4MWIsIDB4OWIsIDB4NWIsIDB4ZGIsIDB4M2IsIDB4YmIsIDB4N2IsIDB4ZmIsXHJcbiAgICAweDA3LCAweDg3LCAweDQ3LCAweGM3LCAweDI3LCAweGE3LCAweDY3LCAweGU3LFxyXG4gICAgMHgxNywgMHg5NywgMHg1NywgMHhkNywgMHgzNywgMHhiNywgMHg3NywgMHhmNyxcclxuICAgIDB4MGYsIDB4OGYsIDB4NGYsIDB4Y2YsIDB4MmYsIDB4YWYsIDB4NmYsIDB4ZWYsXHJcbiAgICAweDFmLCAweDlmLCAweDVmLCAweGRmLCAweDNmLCAweGJmLCAweDdmLCAweGZmXHJcbl07XHJcbkdaaXAuY3BsZW5zID0gW1xyXG4gICAgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMywgMTUsIDE3LCAxOSwgMjMsIDI3LCAzMSxcclxuICAgIDM1LCA0MywgNTEsIDU5LCA2NywgODMsIDk5LCAxMTUsIDEzMSwgMTYzLCAxOTUsIDIyNywgMjU4LCAwLCAwXHJcbl07XHJcbkdaaXAuY3BsZXh0ID0gW1xyXG4gICAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMiwgMiwgMiwgMixcclxuICAgIDMsIDMsIDMsIDMsIDQsIDQsIDQsIDQsIDUsIDUsIDUsIDUsIDAsIDk5LCA5OVxyXG5dO1xyXG4vKiA5OT09aW52YWxpZCAqL1xyXG5HWmlwLmNwZGlzdCA9IFtcclxuICAgIDB4MDAwMSwgMHgwMDAyLCAweDAwMDMsIDB4MDAwNCwgMHgwMDA1LCAweDAwMDcsIDB4MDAwOSwgMHgwMDBkLFxyXG4gICAgMHgwMDExLCAweDAwMTksIDB4MDAyMSwgMHgwMDMxLCAweDAwNDEsIDB4MDA2MSwgMHgwMDgxLCAweDAwYzEsXHJcbiAgICAweDAxMDEsIDB4MDE4MSwgMHgwMjAxLCAweDAzMDEsIDB4MDQwMSwgMHgwNjAxLCAweDA4MDEsIDB4MGMwMSxcclxuICAgIDB4MTAwMSwgMHgxODAxLCAweDIwMDEsIDB4MzAwMSwgMHg0MDAxLCAweDYwMDFcclxuXTtcclxuR1ppcC5jcGRleHQgPSBbXHJcbiAgICAwLCAwLCAwLCAwLCAxLCAxLCAyLCAyLFxyXG4gICAgMywgMywgNCwgNCwgNSwgNSwgNiwgNixcclxuICAgIDcsIDcsIDgsIDgsIDksIDksIDEwLCAxMCxcclxuICAgIDExLCAxMSwgMTIsIDEyLCAxMywgMTNcclxuXTtcclxuR1ppcC5ib3JkZXIgPSBbMTYsIDE3LCAxOCwgMCwgOCwgNywgOSwgNiwgMTAsIDUsIDExLCA0LCAxMiwgMywgMTMsIDIsIDE0LCAxLCAxNV07XHJcblxyXG5cclxuLyoqXHJcbiAqIGd1bnppcFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICovXHJcbkdaaXAucHJvdG90eXBlLmd1bnppcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMub3V0cHV0QXJyID0gW107XHJcblxyXG4gICAgLy9jb252ZXJ0VG9CeXRlQXJyYXkoaW5wdXQpO1xyXG4gICAgLy9pZiAodGhpcy5kZWJ1ZykgYWxlcnQodGhpcy5kYXRhKTtcclxuXHJcbiAgICB0aGlzLm5leHRGaWxlKCk7XHJcbiAgICByZXR1cm4gdGhpcy51bnppcHBlZDtcclxufTtcclxuXHJcbkdaaXAucHJvdG90eXBlLnJlYWRCeXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5iaXRzICs9IDg7XHJcbiAgICBpZiAodGhpcy5ieXRlcG9zIDwgdGhpcy5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIC8vcmV0dXJuIHRoaXMuZGF0YVt0aGlzLmJ5dGVwb3MrK107IC8vIEFycmF5XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jaGFyQ29kZUF0KHRoaXMuYnl0ZXBvcysrKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG59O1xyXG5cclxuR1ppcC5wcm90b3R5cGUuYnl0ZUFsaWduID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5iYiA9IDE7XHJcbn07XHJcblxyXG5HWmlwLnByb3RvdHlwZS5yZWFkQml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNhcnJ5O1xyXG4gICAgdGhpcy5iaXRzKys7XHJcbiAgICBjYXJyeSA9ICh0aGlzLmJiICYgMSk7XHJcbiAgICB0aGlzLmJiID4+PSAxO1xyXG4gICAgaWYgKHRoaXMuYmIgPT09IDApIHtcclxuICAgICAgICB0aGlzLmJiID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgICAgIGNhcnJ5ID0gKHRoaXMuYmIgJiAxKTtcclxuICAgICAgICB0aGlzLmJiID0gKHRoaXMuYmIgPj4gMSkgfCAweDgwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhcnJ5O1xyXG59O1xyXG5cclxuR1ppcC5wcm90b3R5cGUucmVhZEJpdHMgPSBmdW5jdGlvbiAoYSkge1xyXG4gICAgdmFyIHJlcyA9IDAsXHJcbiAgICAgICAgaSA9IGE7XHJcblxyXG4gICAgd2hpbGUgKGktLSkgcmVzID0gKHJlcyA8PCAxKSB8IHRoaXMucmVhZEJpdCgpO1xyXG4gICAgaWYgKGEpIHJlcyA9IEdaaXAuYml0UmV2ZXJzZVtyZXNdID4+ICg4IC0gYSk7XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxufTtcclxuXHJcbkdaaXAucHJvdG90eXBlLmZsdXNoQnVmZmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5iSWR4ID0gMDtcclxufTtcclxuXHJcbkdaaXAucHJvdG90eXBlLmFkZEJ1ZmZlciA9IGZ1bmN0aW9uIChhKSB7XHJcbiAgICB0aGlzLmJ1ZjMya1t0aGlzLmJJZHgrK10gPSBhO1xyXG4gICAgdGhpcy5vdXRwdXRBcnIucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGEpKTtcclxuICAgIGlmICh0aGlzLmJJZHggPT09IDB4ODAwMCkgdGhpcy5iSWR4ID0gMDtcclxufTtcclxuXHJcbkdaaXAucHJvdG90eXBlLklzUGF0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgd2hpbGUgKDEpIHtcclxuICAgICAgICBpZiAodGhpcy5mcG9zW3RoaXMubGVuXSA+PSB0aGlzLmZtYXgpICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICBpZiAodGhpcy5mbGVuc1t0aGlzLmZwb3NbdGhpcy5sZW5dXSA9PT0gdGhpcy5sZW4pIHJldHVybiB0aGlzLmZwb3NbdGhpcy5sZW5dKys7XHJcbiAgICAgICAgdGhpcy5mcG9zW3RoaXMubGVuXSsrO1xyXG4gICAgfVxyXG59O1xyXG5cclxuR1ppcC5wcm90b3R5cGUuUmVjID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGN1cnBsYWNlID0gdGhpcy5QbGFjZXNbdGhpcy50cmVlcG9zXTtcclxuICAgIHZhciB0bXA7XHJcbiAgICAvL2lmICh0aGlzLmRlYnVnKSBkb2N1bWVudC53cml0ZShcIjxicj5sZW46XCIrdGhpcy5sZW4rXCIgdHJlZXBvczpcIit0aGlzLnRyZWVwb3MpO1xyXG4gICAgaWYgKHRoaXMubGVuID09PSAxNykgeyAvL3dhciAxN1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIHRoaXMudHJlZXBvcysrO1xyXG4gICAgdGhpcy5sZW4rKztcclxuXHJcbiAgICB0bXAgPSB0aGlzLklzUGF0KCk7XHJcbiAgICAvL2lmICh0aGlzLmRlYnVnKSBkb2N1bWVudC53cml0ZShcIjxicj5Jc1BhdCBcIit0bXApO1xyXG4gICAgaWYgKHRtcCA+PSAwKSB7XHJcbiAgICAgICAgY3VycGxhY2UuYjAgPSB0bXA7XHJcbiAgICAgICAgLyogbGVhZiBjZWxsIGZvciAwLWJpdCAqL1xyXG4gICAgICAgIC8vaWYgKHRoaXMuZGVidWcpIGRvY3VtZW50LndyaXRlKFwiPGJyPmIwIFwiK2N1cnBsYWNlLmIwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLyogTm90IGEgTGVhZiBjZWxsICovXHJcbiAgICAgICAgY3VycGxhY2UuYjAgPSAweDgwMDA7XHJcbiAgICAgICAgLy9pZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCI8YnI+YjAgXCIrY3VycGxhY2UuYjApO1xyXG4gICAgICAgIGlmICh0aGlzLlJlYygpKSByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICB0bXAgPSB0aGlzLklzUGF0KCk7XHJcbiAgICBpZiAodG1wID49IDApIHtcclxuICAgICAgICBjdXJwbGFjZS5iMSA9IHRtcDtcclxuICAgICAgICAvKiBsZWFmIGNlbGwgZm9yIDEtYml0ICovXHJcbiAgICAgICAgLy9pZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCI8YnI+YjEgXCIrY3VycGxhY2UuYjEpO1xyXG4gICAgICAgIGN1cnBsYWNlLmp1bXAgPSBudWxsO1xyXG4gICAgICAgIC8qIEp1c3QgZm9yIHRoZSBkaXNwbGF5IHJvdXRpbmUgKi9cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLyogTm90IGEgTGVhZiBjZWxsICovXHJcbiAgICAgICAgY3VycGxhY2UuYjEgPSAweDgwMDA7XHJcbiAgICAgICAgLy9pZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCI8YnI+YjEgXCIrY3VycGxhY2UuYjEpO1xyXG4gICAgICAgIGN1cnBsYWNlLmp1bXAgPSB0aGlzLlBsYWNlc1t0aGlzLnRyZWVwb3NdO1xyXG4gICAgICAgIGN1cnBsYWNlLmp1bXBwb3MgPSB0aGlzLnRyZWVwb3M7XHJcbiAgICAgICAgaWYgKHRoaXMuUmVjKCkpIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIHRoaXMubGVuLS07XHJcbiAgICByZXR1cm4gMDtcclxufTtcclxuXHJcbkdaaXAucHJvdG90eXBlLkNyZWF0ZVRyZWUgPSBmdW5jdGlvbiAoY3VycmVudFRyZWUsIG51bXZhbCwgbGVuZ3Rocywgc2hvdykge1xyXG4gICAgdmFyIGk7XHJcbiAgICAvKiBDcmVhdGUgdGhlIEh1ZmZtYW4gZGVjb2RlIHRyZWUvdGFibGUgKi9cclxuICAgIC8vaWYgKHRoaXMuZGVidWcpIGRvY3VtZW50LndyaXRlKFwiY3VycmVudFRyZWUgXCIrY3VycmVudFRyZWUrXCIgbnVtdmFsIFwiK251bXZhbCtcIiBsZW5ndGhzIFwiK2xlbmd0aHMrXCIgc2hvdyBcIitzaG93KTtcclxuICAgIHRoaXMuUGxhY2VzID0gY3VycmVudFRyZWU7XHJcbiAgICB0aGlzLnRyZWVwb3MgPSAwO1xyXG4gICAgdGhpcy5mbGVucyA9IGxlbmd0aHM7XHJcbiAgICB0aGlzLmZtYXggPSBudW12YWw7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTc7IGkrKykgdGhpcy5mcG9zW2ldID0gMDtcclxuICAgIHRoaXMubGVuID0gMDtcclxuICAgIGlmICh0aGlzLlJlYygpKSB7XHJcbiAgICAgICAgLy9pZiAodGhpcy5kZWJ1ZykgYWxlcnQoXCJpbnZhbGlkIGh1ZmZtYW4gdHJlZVxcblwiKTtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1Zykge1xyXG4gICAgLy8gICBkb2N1bWVudC53cml0ZSgnPGJyPlRyZWU6ICcrdGhpcy5QbGFjZXMubGVuZ3RoKTtcclxuICAgIC8vICAgZm9yICh2YXIgYT0wO2E8MzI7YSsrKXtcclxuICAgIC8vICAgICBkb2N1bWVudC53cml0ZShcIlBsYWNlc1tcIithK1wiXS5iMD1cIit0aGlzLlBsYWNlc1thXS5iMCtcIjxicj5cIik7XHJcbiAgICAvLyAgICAgZG9jdW1lbnQud3JpdGUoXCJQbGFjZXNbXCIrYStcIl0uYjE9XCIrdGhpcy5QbGFjZXNbYV0uYjErXCI8YnI+XCIpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcmV0dXJuIDA7XHJcbn07XHJcblxyXG5HWmlwLnByb3RvdHlwZS5EZWNvZGVWYWx1ZSA9IGZ1bmN0aW9uIChjdXJyZW50VHJlZSkge1xyXG4gICAgdmFyIGxlbiwgaSxcclxuICAgICAgICB4dHJlZXBvcyA9IDAsXHJcbiAgICAgICAgWCA9IGN1cnJlbnRUcmVlW3h0cmVlcG9zXSxcclxuICAgICAgICBiO1xyXG5cclxuICAgIC8qIGRlY29kZSBvbmUgc3ltYm9sIG9mIHRoZSBkYXRhICovXHJcbiAgICB3aGlsZSAoMSkge1xyXG4gICAgICAgIGIgPSB0aGlzLnJlYWRCaXQoKTtcclxuICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCJiPVwiK2IpO1xyXG4gICAgICAgIGlmIChiKSB7XHJcbiAgICAgICAgICAgIGlmICghKFguYjEgJiAweDgwMDApKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCJyZXQxXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFguYjE7XHJcbiAgICAgICAgICAgICAgICAvKiBJZiBsZWFmIG5vZGUsIHJldHVybiBkYXRhICovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgWCA9IFguanVtcDtcclxuICAgICAgICAgICAgbGVuID0gY3VycmVudFRyZWUubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZVtpXSA9PT0gWCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHh0cmVlcG9zID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghKFguYjAgJiAweDgwMDApKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCJyZXQyXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFguYjA7XHJcbiAgICAgICAgICAgICAgICAvKiBJZiBsZWFmIG5vZGUsIHJldHVybiBkYXRhICovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeHRyZWVwb3MrKztcclxuICAgICAgICAgICAgWCA9IGN1cnJlbnRUcmVlW3h0cmVlcG9zXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCJyZXQzXCIpO1xyXG5cclxuICAgIHJldHVybiAtMTtcclxufTtcclxuXHJcbkdaaXAucHJvdG90eXBlLkRlZmxhdGVMb29wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGxhc3QsIGMsIHR5cGUsIGksIGxlbjtcclxuICAgIGRvIHtcclxuICAgICAgICBsYXN0ID0gdGhpcy5yZWFkQml0KCk7XHJcbiAgICAgICAgdHlwZSA9IHRoaXMucmVhZEJpdHMoMik7XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBibG9ja0xlbiwgY1N1bTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0b3JlZFxyXG4gICAgICAgICAgICB0aGlzLmJ5dGVBbGlnbigpO1xyXG4gICAgICAgICAgICBibG9ja0xlbiA9IHRoaXMucmVhZEJ5dGUoKTtcclxuICAgICAgICAgICAgYmxvY2tMZW4gfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcclxuXHJcbiAgICAgICAgICAgIGNTdW0gPSB0aGlzLnJlYWRCeXRlKCk7XHJcbiAgICAgICAgICAgIGNTdW0gfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcclxuXHJcbiAgICAgICAgICAgIGlmICgoKGJsb2NrTGVuIF4gfmNTdW0pICYgMHhmZmZmKSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQud3JpdGUoXCJCbG9ja0xlbiBjaGVja3N1bSBtaXNtYXRjaFxcblwiKTsgLy8gRklYTUU6IHVzZSB0aHJvd1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlIChibG9ja0xlbi0tKSB7XHJcbiAgICAgICAgICAgICAgICBjID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCdWZmZXIoYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgdmFyIGo7XHJcblxyXG4gICAgICAgICAgICAvKiBGaXhlZCBIdWZmbWFuIHRhYmxlcyAtLSBmaXhlZCBkZWNvZGUgcm91dGluZSAqL1xyXG4gICAgICAgICAgICB3aGlsZSAoMSkge1xyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAyNTYgICAgMDAwMDAwMCAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgIDogICA6ICAgICA6XHJcbiAgICAgICAgICAgICAgICAgMjc5ICAgIDAwMTAxMTEgICAgICAgIDIzXHJcbiAgICAgICAgICAgICAgICAgMCAgIDAwMTEwMDAwICAgIDQ4XHJcbiAgICAgICAgICAgICAgICAgOiAgICA6ICAgICAgOlxyXG4gICAgICAgICAgICAgICAgIDE0MyAgICAxMDExMTExMSAgICAxOTFcclxuICAgICAgICAgICAgICAgICAyODAgMTEwMDAwMDAgICAgMTkyXHJcbiAgICAgICAgICAgICAgICAgOiAgICA6ICAgICAgOlxyXG4gICAgICAgICAgICAgICAgIDI4NyAxMTAwMDExMSAgICAxOTlcclxuICAgICAgICAgICAgICAgICAxNDQgICAgMTEwMDEwMDAwICAgIDQwMFxyXG4gICAgICAgICAgICAgICAgIDogICAgOiAgICAgICA6XHJcbiAgICAgICAgICAgICAgICAgMjU1ICAgIDExMTExMTExMSAgICA1MTFcclxuXHJcbiAgICAgICAgICAgICAgICAgTm90ZSB0aGUgYml0IG9yZGVyIVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBqID0gKEdaaXAuYml0UmV2ZXJzZVt0aGlzLnJlYWRCaXRzKDcpXSA+PiAxKTtcclxuICAgICAgICAgICAgICAgIGlmIChqID4gMjMpIHtcclxuICAgICAgICAgICAgICAgICAgICBqID0gKGogPDwgMSkgfCB0aGlzLnJlYWRCaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvKiA0OC4uMjU1ICovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqID4gMTk5KSB7ICAgICAgICAgICAgICAvKiAyMDAuLjI1NSAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqIC09IDEyODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLyogIDcyLi4xMjcgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IChqIDw8IDEpIHwgdGhpcy5yZWFkQml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIDE0NC4uMjU1IDw8ICovXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgIC8qICA0OC4uMTk5ICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGogLT0gNDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qICAgMC4uMTUxICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID4gMTQzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqID0gaiArIDEzNjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIDI4MC4uMjg3IDw8ICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgIDAuLjE0MyA8PCAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgLyogICAwLi4yMyAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGogKz0gMjU2O1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIDI1Ni4uMjc5IDw8ICovXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaiA8IDI1Nikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVmZmVyKGopO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChqID09PSAyNTYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvKiBFT0YgKi9cclxuICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gRklYTUU6IG1ha2UgdGhpcyB0aGUgbG9vcC1jb25kaXRpb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbiwgZGlzdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaiAtPSAyNTYgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIGJ5dGVzICsgRU9GICovXHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5yZWFkQml0cyhHWmlwLmNwbGV4dFtqXSkgKyBHWmlwLmNwbGVuc1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaiA9IEdaaXAuYml0UmV2ZXJzZVt0aGlzLnJlYWRCaXRzKDUpXSA+PiAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChHWmlwLmNwZGV4dFtqXSA+IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdCA9IHRoaXMucmVhZEJpdHMoOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3QgfD0gKHRoaXMucmVhZEJpdHMoR1ppcC5jcGRleHRbal0gLSA4KSA8PCA4KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0ID0gdGhpcy5yZWFkQml0cyhHWmlwLmNwZGV4dFtqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3QgKz0gR1ppcC5jcGRpc3Rbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW47IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IHRoaXMuYnVmMzJrWyh0aGlzLmJJZHggLSBkaXN0KSAmIDB4N2ZmZl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVmZmVyKGMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAvLyB3aGlsZVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgdmFyIGosIG4sIGxpdGVyYWxDb2RlcywgZGlzdENvZGVzLCBsZW5Db2RlcztcclxuICAgICAgICAgICAgdmFyIGxsID0gbmV3IEFycmF5KDI4OCArIDMyKTsgICAgLy8gXCJzdGF0aWNcIiBqdXN0IHRvIHByZXNlcnZlIHN0YWNrXHJcblxyXG4gICAgICAgICAgICAvLyBEeW5hbWljIEh1ZmZtYW4gdGFibGVzXHJcblxyXG4gICAgICAgICAgICBsaXRlcmFsQ29kZXMgPSAyNTcgKyB0aGlzLnJlYWRCaXRzKDUpO1xyXG4gICAgICAgICAgICBkaXN0Q29kZXMgPSAxICsgdGhpcy5yZWFkQml0cyg1KTtcclxuICAgICAgICAgICAgbGVuQ29kZXMgPSA0ICsgdGhpcy5yZWFkQml0cyg0KTtcclxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IDE5OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxsW2pdID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBkZWNvZGUgdHJlZSBjb2RlIGxlbmd0aHNcclxuXHJcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5Db2RlczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsbFtHWmlwLmJvcmRlcltqXV0gPSB0aGlzLnJlYWRCaXRzKDMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbiA9IHRoaXMuZGlzdGFuY2VUcmVlLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB0aGlzLmRpc3RhbmNlVHJlZVtpXSA9IG5ldyBHWmlwLkh1Zk5vZGUoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ3JlYXRlVHJlZSh0aGlzLmRpc3RhbmNlVHJlZSwgMTksIGxsLCAwKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbHVzaEJ1ZmZlcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIHtcclxuICAgICAgICAgICAgLy8gICBkb2N1bWVudC53cml0ZShcIjxicj5kaXN0YW5jZVRyZWVcIik7XHJcbiAgICAgICAgICAgIC8vICAgZm9yKHZhciBhPTA7YTx0aGlzLmRpc3RhbmNlVHJlZS5sZW5ndGg7YSsrKXtcclxuICAgICAgICAgICAgLy8gICAgIGRvY3VtZW50LndyaXRlKFwiPGJyPlwiK3RoaXMuZGlzdGFuY2VUcmVlW2FdLmIwK1wiIFwiK3RoaXMuZGlzdGFuY2VUcmVlW2FdLmIxK1wiIFwiK3RoaXMuZGlzdGFuY2VUcmVlW2FdLmp1bXArXCIgXCIrdGhpcy5kaXN0YW5jZVRyZWVbYV0uanVtcHBvcyk7XHJcbiAgICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAvL3JlYWQgaW4gbGl0ZXJhbCBhbmQgZGlzdGFuY2UgY29kZSBsZW5ndGhzXHJcbiAgICAgICAgICAgIG4gPSBsaXRlcmFsQ29kZXMgKyBkaXN0Q29kZXM7XHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICB2YXIgeiA9IC0xO1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCI8YnI+bj1cIituK1wiIGJpdHM6IFwiK3RoaXMuYml0cytcIjxicj5cIik7XHJcbiAgICAgICAgICAgIHdoaWxlIChpIDwgbikge1xyXG4gICAgICAgICAgICAgICAgeisrO1xyXG4gICAgICAgICAgICAgICAgaiA9IHRoaXMuRGVjb2RlVmFsdWUodGhpcy5kaXN0YW5jZVRyZWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGRvY3VtZW50LndyaXRlKFwiPGJyPlwiK3orXCIgaTpcIitpK1wiIGRlY29kZTogXCIraitcIiAgICBiaXRzIFwiK3RoaXMuYml0cytcIjxicj5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaiA8IDE2KSB7ICAgIC8vIGxlbmd0aCBvZiBjb2RlIGluIGJpdHMgKDAuLjE1KVxyXG4gICAgICAgICAgICAgICAgICAgIGxsW2krK10gPSBqO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChqID09PSAxNikgeyAgICAvLyByZXBlYXQgbGFzdCBsZW5ndGggMyB0byA2IHRpbWVzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaiA9IDMgKyB0aGlzLnJlYWRCaXRzKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpICsgaiA+IG4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHVzaEJ1ZmZlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbCA9IGkgPyBsbFtpIC0gMV0gOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChqLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGxbaSsrXSA9IGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gMTcpIHsgICAgICAgIC8vIDMgdG8gMTAgemVybyBsZW5ndGggY29kZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDMgKyB0aGlzLnJlYWRCaXRzKDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAvLyBqID09IDE4OiAxMSB0byAxMzggemVybyBsZW5ndGggY29kZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDExICsgdGhpcy5yZWFkQml0cyg3KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgKyBqID4gbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsdXNoQnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoai0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxsW2krK10gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAvLyB3aGlsZVxyXG5cclxuICAgICAgICAgICAgLy8gQ2FuIG92ZXJ3cml0ZSB0cmVlIGRlY29kZSB0cmVlIGFzIGl0IGlzIG5vdCB1c2VkIGFueW1vcmVcclxuICAgICAgICAgICAgbGVuID0gdGhpcy5saXRlcmFsVHJlZS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMubGl0ZXJhbFRyZWVbaV0gPSBuZXcgR1ppcC5IdWZOb2RlKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNyZWF0ZVRyZWUodGhpcy5saXRlcmFsVHJlZSwgbGl0ZXJhbENvZGVzLCBsbCwgMCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmx1c2hCdWZmZXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbiA9IHRoaXMubGl0ZXJhbFRyZWUubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHRoaXMuZGlzdGFuY2VUcmVlW2ldID0gbmV3IEdaaXAuSHVmTm9kZSgpO1xyXG4gICAgICAgICAgICB2YXIgbGwyID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IGxpdGVyYWxDb2RlczsgaSA8IGxsLmxlbmd0aDsgaSsrKSBsbDJbaSAtIGxpdGVyYWxDb2Rlc10gPSBsbFtpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ3JlYXRlVHJlZSh0aGlzLmRpc3RhbmNlVHJlZSwgZGlzdENvZGVzLCBsbDIsIDApKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsdXNoQnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCI8YnI+bGl0ZXJhbFRyZWVcIik7XHJcbiAgICAgICAgICAgIHdoaWxlICgxKSB7XHJcbiAgICAgICAgICAgICAgICBqID0gdGhpcy5EZWNvZGVWYWx1ZSh0aGlzLmxpdGVyYWxUcmVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChqID49IDI1NikgeyAgICAgICAgLy8gSW4gQzY0OiBpZiBjYXJyeSBzZXRcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuLCBkaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIGogLT0gMjU2O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVPRlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgai0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMucmVhZEJpdHMoR1ppcC5jcGxleHRbal0pICsgR1ppcC5jcGxlbnNbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGogPSB0aGlzLkRlY29kZVZhbHVlKHRoaXMuZGlzdGFuY2VUcmVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoR1ppcC5jcGRleHRbal0gPiA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3QgPSB0aGlzLnJlYWRCaXRzKDgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0IHw9ICh0aGlzLnJlYWRCaXRzKEdaaXAuY3BkZXh0W2pdIC0gOCkgPDwgOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdCA9IHRoaXMucmVhZEJpdHMoR1ppcC5jcGRleHRbal0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkaXN0ICs9IEdaaXAuY3BkaXN0W2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChsZW4tLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IHRoaXMuYnVmMzJrWyh0aGlzLmJJZHggLSBkaXN0KSAmIDB4N2ZmZl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVmZmVyKGMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRCdWZmZXIoaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gLy8gd2hpbGVcclxuICAgICAgICB9XHJcbiAgICB9IHdoaWxlICghbGFzdCk7XHJcbiAgICB0aGlzLmZsdXNoQnVmZmVyKCk7XHJcblxyXG4gICAgdGhpcy5ieXRlQWxpZ24oKTtcclxuICAgIHJldHVybiAwO1xyXG59O1xyXG5cclxuR1ppcC5wcm90b3R5cGUudW56aXBGaWxlID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHZhciBpO1xyXG4gICAgdGhpcy5ndW56aXAoKTtcclxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnVuemlwcGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudW56aXBwZWRbaV1bMV0gPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudW56aXBwZWRbaV1bMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuR1ppcC5wcm90b3R5cGUubmV4dEZpbGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQoXCJORVhURklMRVwiKTtcclxuXHJcbiAgICB0aGlzLm91dHB1dEFyciA9IFtdO1xyXG4gICAgdGhpcy5tb2RlWklQID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIHRtcCA9IFtdO1xyXG4gICAgdG1wWzBdID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgdG1wWzFdID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwidHlwZTogXCIrdG1wWzBdK1wiIFwiK3RtcFsxXSk7XHJcblxyXG4gICAgaWYgKHRtcFswXSA9PT0gMHg3OCAmJiB0bXBbMV0gPT09IDB4ZGEpIHsgLy9HWklQXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwiR0VPTkV4VC1HWklQXCIpO1xyXG4gICAgICAgIHRoaXMuRGVmbGF0ZUxvb3AoKTtcclxuICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQodGhpcy5vdXRwdXRBcnIuam9pbignJykpO1xyXG4gICAgICAgIHRoaXMudW56aXBwZWRbdGhpcy5maWxlc10gPSBbdGhpcy5vdXRwdXRBcnIuam9pbignJyksIFwiZ2VvbmV4dC5neHRcIl07XHJcbiAgICAgICAgdGhpcy5maWxlcysrO1xyXG4gICAgfVxyXG4gICAgaWYgKHRtcFswXSA9PT0gMHgxZiAmJiB0bXBbMV0gPT09IDB4OGIpIHsgLy9HWklQXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwiR1pJUFwiKTtcclxuICAgICAgICB0aGlzLnNraXBkaXIoKTtcclxuICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQodGhpcy5vdXRwdXRBcnIuam9pbignJykpO1xyXG4gICAgICAgIHRoaXMudW56aXBwZWRbdGhpcy5maWxlc10gPSBbdGhpcy5vdXRwdXRBcnIuam9pbignJyksIFwiZmlsZVwiXTtcclxuICAgICAgICB0aGlzLmZpbGVzKys7XHJcbiAgICB9XHJcbiAgICBpZiAodG1wWzBdID09PSAweDUwICYmIHRtcFsxXSA9PT0gMHg0YikgeyAvL1pJUFxyXG4gICAgICAgIHRoaXMubW9kZVpJUCA9IHRydWU7XHJcbiAgICAgICAgdG1wWzJdID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgICAgIHRtcFszXSA9IHRoaXMucmVhZEJ5dGUoKTtcclxuICAgICAgICBpZiAodG1wWzJdID09PSAweDAzICYmIHRtcFszXSA9PT0gMHgwNCkge1xyXG4gICAgICAgICAgICAvL01PREVfWklQXHJcbiAgICAgICAgICAgIHRtcFswXSA9IHRoaXMucmVhZEJ5dGUoKTtcclxuICAgICAgICAgICAgdG1wWzFdID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQoXCJaSVAtVmVyc2lvbjogXCIrdG1wWzFdK1wiIFwiK3RtcFswXS8xMCtcIi5cIit0bXBbMF0lMTApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncGZsYWdzID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdwZmxhZ3MgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwiZ3BmbGFnczogXCIrdGhpcy5ncGZsYWdzKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSB0aGlzLnJlYWRCeXRlKCk7XHJcbiAgICAgICAgICAgIG1ldGhvZCB8PSAodGhpcy5yZWFkQnl0ZSgpIDw8IDgpO1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQoXCJtZXRob2Q6IFwiK21ldGhvZCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlYWRCeXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVhZEJ5dGUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRCeXRlKCk7XHJcblxyXG4vLyAgICAgICB2YXIgY3JjID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4vLyAgICAgICBjcmMgfD0gKHRoaXMucmVhZEJ5dGUoKTw8OCk7XHJcbi8vICAgICAgIGNyYyB8PSAodGhpcy5yZWFkQnl0ZSgpPDwxNik7XHJcbi8vICAgICAgIGNyYyB8PSAodGhpcy5yZWFkQnl0ZSgpPDwyNCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29tcFNpemUgPSB0aGlzLnJlYWRCeXRlKCk7XHJcbiAgICAgICAgICAgIGNvbXBTaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgOCk7XHJcbiAgICAgICAgICAgIGNvbXBTaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgMTYpO1xyXG4gICAgICAgICAgICBjb21wU2l6ZSB8PSAodGhpcy5yZWFkQnl0ZSgpIDw8IDI0KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgICAgICAgICBzaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgOCk7XHJcbiAgICAgICAgICAgIHNpemUgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCAxNik7XHJcbiAgICAgICAgICAgIHNpemUgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCAyNCk7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQoXCJsb2NhbCBDUkM6IFwiK2NyYytcIlxcbmxvY2FsIFNpemU6IFwiK3NpemUrXCJcXG5sb2NhbCBDb21wU2l6ZTogXCIrY29tcFNpemUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbGVsZW4gPSB0aGlzLnJlYWRCeXRlKCk7XHJcbiAgICAgICAgICAgIGZpbGVsZW4gfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBleHRyYWxlbiA9IHRoaXMucmVhZEJ5dGUoKTtcclxuICAgICAgICAgICAgZXh0cmFsZW4gfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmRlYnVnKSBhbGVydChcImZpbGVsZW4gXCIrZmlsZWxlbik7XHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWVCdWYgPSBbXTtcclxuICAgICAgICAgICAgd2hpbGUgKGZpbGVsZW4tLSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSB0aGlzLnJlYWRCeXRlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYyA9PT0gXCIvXCIgfCBjID09PSBcIjpcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgR1ppcC5OQU1FTUFYIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZUJ1ZltpKytdID0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQoXCJuYW1lQnVmOiBcIit0aGlzLm5hbWVCdWYpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpbGVvdXQpIHRoaXMuZmlsZW91dCA9IHRoaXMubmFtZUJ1ZjtcclxuXHJcbiAgICAgICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKGkgPCBleHRyYWxlbikge1xyXG4gICAgICAgICAgICAgICAgYyA9IHRoaXMucmVhZEJ5dGUoKTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKHNpemUgPSAwICYmIHRoaXMuZmlsZU91dC5jaGFyQXQodGhpcy5maWxlb3V0Lmxlbmd0aC0xKT09XCIvXCIpe1xyXG4gICAgICAgICAgICAvLyAgIC8vc2tpcGRpclxyXG4gICAgICAgICAgICAvLyAgIC8vIGlmICh0aGlzLmRlYnVnKSBhbGVydChcInNraXBkaXJcIik7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gOCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EZWZsYXRlTG9vcCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KHRoaXMub3V0cHV0QXJyLmpvaW4oJycpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW56aXBwZWRbdGhpcy5maWxlc10gPSBbdGhpcy5vdXRwdXRBcnIuam9pbignJyksIHRoaXMubmFtZUJ1Zi5qb2luKCcnKV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5za2lwZGlyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuR1ppcC5wcm90b3R5cGUuc2tpcGRpciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0bXAgPSBbXTtcclxuICAgIHZhciBjb21wU2l6ZSwgc2l6ZSwgb3MsIGksIGM7XHJcblxyXG4gICAgaWYgKCh0aGlzLmdwZmxhZ3MgJiA4KSkge1xyXG4gICAgICAgIHRtcFswXSA9IHRoaXMucmVhZEJ5dGUoKTtcclxuICAgICAgICB0bXBbMV0gPSB0aGlzLnJlYWRCeXRlKCk7XHJcbiAgICAgICAgdG1wWzJdID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgICAgIHRtcFszXSA9IHRoaXMucmVhZEJ5dGUoKTtcclxuXHJcbi8vICAgICBpZiAodG1wWzBdID09IDB4NTAgJiYgdG1wWzFdID09IDB4NGIgJiYgdG1wWzJdID09IDB4MDcgJiYgdG1wWzNdID09IDB4MDgpIHtcclxuLy8gICAgICAgY3JjID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4vLyAgICAgICBjcmMgfD0gKHRoaXMucmVhZEJ5dGUoKTw8OCk7XHJcbi8vICAgICAgIGNyYyB8PSAodGhpcy5yZWFkQnl0ZSgpPDwxNik7XHJcbi8vICAgICAgIGNyYyB8PSAodGhpcy5yZWFkQnl0ZSgpPDwyNCk7XHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICBjcmMgPSB0bXBbMF0gfCAodG1wWzFdPDw4KSB8ICh0bXBbMl08PDE2KSB8ICh0bXBbM108PDI0KTtcclxuLy8gICAgIH1cclxuXHJcbiAgICAgICAgY29tcFNpemUgPSB0aGlzLnJlYWRCeXRlKCk7XHJcbiAgICAgICAgY29tcFNpemUgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcclxuICAgICAgICBjb21wU2l6ZSB8PSAodGhpcy5yZWFkQnl0ZSgpIDw8IDE2KTtcclxuICAgICAgICBjb21wU2l6ZSB8PSAodGhpcy5yZWFkQnl0ZSgpIDw8IDI0KTtcclxuXHJcbiAgICAgICAgc2l6ZSA9IHRoaXMucmVhZEJ5dGUoKTtcclxuICAgICAgICBzaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgOCk7XHJcbiAgICAgICAgc2l6ZSB8PSAodGhpcy5yZWFkQnl0ZSgpIDw8IDE2KTtcclxuICAgICAgICBzaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgMjQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm1vZGVaSVApIHRoaXMubmV4dEZpbGUoKTtcclxuXHJcbiAgICB0bXBbMF0gPSB0aGlzLnJlYWRCeXRlKCk7XHJcbiAgICBpZiAodG1wWzBdICE9PSA4KSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwiVW5rbm93biBjb21wcmVzc2lvbiBtZXRob2QhXCIpO1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3BmbGFncyA9IHRoaXMucmVhZEJ5dGUoKTtcclxuICAgIC8vIGlmICh0aGlzLmRlYnVnICYmICh0aGlzLmdwZmxhZ3MgJiB+KDB4MWYpKSkgYWxlcnQoXCJVbmtub3duIGZsYWdzIHNldCFcIik7XHJcblxyXG4gICAgdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgdGhpcy5yZWFkQnl0ZSgpO1xyXG5cclxuICAgIHRoaXMucmVhZEJ5dGUoKTtcclxuICAgIG9zID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG5cclxuICAgIGlmICgodGhpcy5ncGZsYWdzICYgNCkpIHtcclxuICAgICAgICB0bXBbMF0gPSB0aGlzLnJlYWRCeXRlKCk7XHJcbiAgICAgICAgdG1wWzJdID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgICAgIHRoaXMubGVuID0gdG1wWzBdICsgMjU2ICogdG1wWzFdO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmRlYnVnKSBhbGVydChcIkV4dHJhIGZpZWxkIHNpemU6IFwiK3RoaXMubGVuKTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW47IGkrKylcclxuICAgICAgICAgICAgdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgodGhpcy5ncGZsYWdzICYgOCkpIHtcclxuICAgICAgICBpID0gMDtcclxuICAgICAgICB0aGlzLm5hbWVCdWYgPSBbXTtcclxuICAgICAgICB3aGlsZSAoYyA9IHRoaXMucmVhZEJ5dGUoKSkge1xyXG4gICAgICAgICAgICBpZiAoYyA9PT0gXCI3XCIgfHwgYyA9PT0gXCI6XCIpXHJcbiAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgaWYgKGkgPCBHWmlwLk5BTUVNQVggLSAxKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lQnVmW2krK10gPSBjO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMubmFtZUJ1ZltpXSA9IFwiXFwwXCI7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwib3JpZ2luYWwgZmlsZSBuYW1lOiBcIit0aGlzLm5hbWVCdWYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgodGhpcy5ncGZsYWdzICYgMTYpKSB7XHJcbiAgICAgICAgd2hpbGUgKGMgPSB0aGlzLnJlYWRCeXRlKCkpIHsgLy8gRklYTUU6IGxvb2tzIGxpa2UgdGhleSByZWFkIHRvIHRoZSBlbmQgb2YgdGhlIHN0cmVhbSwgc2hvdWxkIGJlIGRvYWJsZSBtb3JlIGVmZmljaWVudGx5XHJcbiAgICAgICAgICAgIC8vRklMRSBDT01NRU5UXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICgodGhpcy5ncGZsYWdzICYgMikpIHtcclxuICAgICAgICB0aGlzLnJlYWRCeXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuRGVmbGF0ZUxvb3AoKTtcclxuXHJcbi8vICAgY3JjID0gdGhpcy5yZWFkQnl0ZSgpO1xyXG4vLyAgIGNyYyB8PSAodGhpcy5yZWFkQnl0ZSgpPDw4KTtcclxuLy8gICBjcmMgfD0gKHRoaXMucmVhZEJ5dGUoKTw8MTYpO1xyXG4vLyAgIGNyYyB8PSAodGhpcy5yZWFkQnl0ZSgpPDwyNCk7XHJcblxyXG4gICAgc2l6ZSA9IHRoaXMucmVhZEJ5dGUoKTtcclxuICAgIHNpemUgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcclxuICAgIHNpemUgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCAxNik7XHJcbiAgICBzaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgMjQpO1xyXG5cclxuICAgIGlmICh0aGlzLm1vZGVaSVApIHRoaXMubmV4dEZpbGUoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR1ppcDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=